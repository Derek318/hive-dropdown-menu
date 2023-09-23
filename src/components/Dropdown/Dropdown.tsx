import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./Dropdown.css";

type Option = string;
type OnMultipleChange = (value: Option[]) => void;

interface DropdownProps {
  options: Option[];
  onChange?: OnMultipleChange;
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
}

/**
 * Dropdown Component
 *
 * @param {object} props - Props for the Dropdown component.
 * @param {function} props.onChange - Callback function invoked when selection changes.
 * @param {Array} props.options - List of options to display in the dropdown.
 * @param {boolean} props.multiple - Whether multiple options can be selected.
 * @param {boolean} props.searchable - Whether the dropdown supports searching.
 * @param {string} props.placeholder - Placeholder text when no options are selected.
 * @returns {JSX.Element} - The rendered Dropdown component.
 */
function Dropdown({
  onChange,
  options,
  multiple,
  searchable,
  placeholder,
}: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [availableWidth, setAvailableWidth] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visibleOptions, setVisibleOptions] = useState<Option[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const batchSize = 100;

  // LayoutEffect to calculate width pre-render
  useLayoutEffect(() => {
    if (dropdownRef.current) {
      setAvailableWidth(dropdownRef.current.offsetWidth);
    }
  }, []);

  // Client Callback on Selection Change
  useEffect(() => {
    onChange?.(selected);
  }, [onChange, selected]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (option: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    // If opening the dropdown, load the initial batch of options
    if (!isOpen) {
      loadOptions();
    }
  };

  const loadOptions = () => {
    const endIndex = Math.min(startIndex + batchSize, options.length);
    const newOptions = options.slice(startIndex, endIndex);
    setVisibleOptions((prevOptions) => [...prevOptions, ...newOptions]);
    setStartIndex(endIndex);
  };

  const renderSelectedItems = () => {
    let totalWidth = 0;
    let itemCount = 0;
    const renderedItems: JSX.Element[] = [];

    for (const item of selected) {
      const itemWidth = getItemWidth(item);
      // If adding this item would exceed the available width, stop rendering.
      if (availableWidth !== null && totalWidth + itemWidth > availableWidth) {
        const summaryWidth = getItemWidth(
          `+${selected.length - itemCount} more`
        );

        // Merge case
        if (totalWidth + summaryWidth > availableWidth) {
          renderedItems.pop();
          itemCount -= 1;
        }

        renderedItems.push(
          <div
            key="summary-item"
            className="selected-item"
            onClick={toggleDropdown}
          >
            +{selected.length - itemCount} more
          </div>
        );
        break;
      }

      // Normal case
      totalWidth += itemWidth;
      itemCount += 1;
      renderedItems.push(
        <div key={item} className="selected-item">
          <span>{item}</span>
          <span
            className="remove-item"
            onClick={(e) => handleRemoveSelected(item, e)}
          >
            &times;
          </span>
        </div>
      );
    }

    return renderedItems;
  };

  const clearSelection = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setSelected([]);
  };

  const handleRemoveSelected = (
    itemToRemove: string,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSelected((prevSelected) =>
      prevSelected.filter((item) => item !== itemToRemove)
    );
  };

  const getItemWidth = (item: string) => {
    const fontSize = 14;
    const paddingX = 16;

    // Calculate the approximate width based on text content length
    const textWidth = item.length * (fontSize * 0.6);
    const totalWidth = textWidth + 2 * paddingX;

    return totalWidth;
  };

  const renderLoadMoreOption = () => {
    if (startIndex < options.length) {
      return (
        <div className="load-more-option" onClick={loadOptions}>
          Load More
        </div>
      );
    }
    return null;
  };

  const displayOptions =
    searchQuery.length > 0
      ? options.filter((option) =>
          option.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : visibleOptions;

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number | undefined
  ) => {
    let timeoutId: NodeJS.Timeout | undefined;

    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSetSearchQuery = debounce(
    (value: React.SetStateAction<string>) => {
      setSearchQuery(value);
    },
    50
  );

  const renderVisibleOptions = () => {
    return (
      <>
        {searchable && (
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => debouncedSetSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {displayOptions
          .filter((option) =>
            option.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((option, index) => {
            const isOptionSelected = selected.includes(option);
            const isOptionDisabled =
              !multiple && !isOptionSelected && selected.length > 0;

            return (
              <label
                className={`dropdown-item custom-checkbox-label ${
                  isOptionDisabled ? "disabled" : ""
                }`}
                key={`option-${index}`}
              >
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={isOptionSelected}
                  onChange={() => handleCheckboxChange(option)}
                  disabled={isOptionDisabled}
                />
                {option}
              </label>
            );
          })}
        {searchQuery.length === 0 && renderLoadMoreOption()}
      </>
    );
  };

  const dropdownContent = isOpen ? (
    <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
      {renderVisibleOptions()}
    </div>
  ) : null;

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-area ${isOpen ? "active" : ""}`}
        onClick={toggleDropdown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="selected-items">{renderSelectedItems()}</div>
        {selected.length === 0 ? (
          <div className="placeholder">{placeholder}</div>
        ) : null}
        <div className="dropdown-arrow">
          {isHovered && selected.length > 0 ? (
            <span onClick={clearSelection}>&times;</span>
          ) : (
            <span>&#x2304;</span>
          )}
        </div>
      </div>
      {dropdownContent}
    </div>
  );
}

export default Dropdown;
