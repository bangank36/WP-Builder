import merge from 'lodash/merge';
import {
	isObjectControl,
	rankWith,
	and,
	schemaMatches,
} from '@jsonforms/core';
import {
	withJsonFormsControlProps,
} from '@jsonforms/react';
import React, { useMemo } from 'react';

import {
	__experimentalInputControl as InputControl,
	__experimentalVStack as VStack,
	Tooltip,
	FlexItem,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	Dropdown,
	Button,
	SlotFillProvider,
	Popover,
} from '@wordpress/components';

import { calendar } from '@wordpress/icons';

import DatePicker from 'react-datepicker';
import { format, parse } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

export const DateRangeRenderer = ({
	schema,
	label,
	path,
	visible,
	data,
	handleChange,
	config,
	uischema,
	id,
	description,
}) => {
	const appliedUiSchemaOptions = merge({}, config, uischema?.options);

	const dateFormat = appliedUiSchemaOptions.dateFormat ?? 'yyyy-MM-dd';
	const dateSaveFormat = appliedUiSchemaOptions.dateSaveFormat ?? 'yyyy-MM-dd';

	// Parse current data values
	const currentData = data || {};
	
	const startDateValue = useMemo(() => {
		if (currentData.startDate) {
			try {
				return parse(currentData.startDate, dateSaveFormat, new Date());
			} catch {
				return null;
			}
		}
		return null;
	}, [currentData.startDate, dateSaveFormat]);

	const endDateValue = useMemo(() => {
		if (currentData.endDate) {
			try {
				return parse(currentData.endDate, dateSaveFormat, new Date());
			} catch {
				return null;
			}
		}
		return null;
	}, [currentData.endDate, dateSaveFormat]);

	// Format display values
	const formatStartDate = startDateValue ? format(startDateValue, dateFormat) : '';
	const formatEndDate = endDateValue ? format(endDateValue, dateFormat) : '';

	const handleDateRangeChange = (dates) => {
		const [start, end] = dates;
		const newData = {
			...currentData,
			startDate: start ? format(start, dateSaveFormat) : undefined,
			endDate: end ? format(end, dateSaveFormat) : undefined,
		};
		handleChange(path, newData);
	};

	// Get title from schema or uischema
	const displayLabel = label || schema?.title || 'Date Range';

	return !visible ? null : (
		<div style={{ width: '100%' }}>
			<InputControl
				id={id}
				value={formatStartDate && formatEndDate 
					? `${formatStartDate} - ${formatEndDate}` 
					: formatStartDate || 'Select date range'}
				readOnly
				style={{ width: '100%' }}
				suffix={
					<Dropdown
						popoverProps={{
							placement: 'bottom-end',
							offset: 0,
							shift: true,
						}}
						className="date-range-picker-dropdown"
						contentClassName="date-range-picker-content"
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								icon={calendar}
								label="Open date picker"
								onClick={onToggle}
							/>
						)}
						renderContent={() => (
							<DropdownContentWrapper paddingSize="none">
								<SlotFillProvider>
									<DatePicker
										inline
										selected={startDateValue}
										onChange={handleDateRangeChange}
										startDate={startDateValue}
										endDate={endDateValue}
										selectsRange
										dateFormat={dateFormat}
										showMonthDropdown
										showYearDropdown
									/>
									<Popover.Slot />
								</SlotFillProvider>
							</DropdownContentWrapper>
						)}
					/>
				}
			/>
		</div>
	);
};

// Tester: matches object controls with format: 'daterange'
export const dateRangeRendererTester = rankWith(
	10, // Higher priority than generic object control
	and(
		isObjectControl,
		schemaMatches((schema) => schema.format === 'daterange')
	)
);

export default withJsonFormsControlProps(DateRangeRenderer);
