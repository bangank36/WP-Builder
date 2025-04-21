import React from "react";
import merge from "lodash/merge";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isDateControl } from "@jsonforms/core";
import { 
    __experimentalInputControl as InputControl,
    TextControl as UiTextControl,
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

import DatePicker from "react-datepicker";
import { format, parse } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";


() => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    );
  };

const TextControl = ( props ) => {
	const {
		id,
		description,
		label,
		path,
		data,
        visible,
		handleChange,
        config,
        uischema
	} = props;
  
    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const dateFormat = appliedUiSchemaOptions.dateFormat ?? 'yyyy-MM-dd';
    const dateSaveFormat = appliedUiSchemaOptions.dateSaveFormat ?? 'yyyy-MM-dd';

    const value = data ? parse(data, dateSaveFormat, new Date()) : new Date();
    const formatValue = format(value, dateFormat);

    return !visible ? null : ( 
        <>
            <VStack justify="space-between">
                <FlexItem>
                    { description ? (
                        <Tooltip text={ description }>
                        <label htmlFor={ id }>
                            { label }
                        </label>
                    </Tooltip>
                    ) : ( 
                        <label htmlFor={ id }>
                            { label }
                        </label> 
                    ) }
                </FlexItem>
                <FlexItem>
                    <InputControl
                        value={ formatValue }
                        suffix={
                            <>
                                <Dropdown
                                    popoverProps={ {
                                        placement: 'bottom-end',
                                        offset: 0,
                                        shift: true,
                                    } }
                                    className="my-container-class-name"
                                    contentClassName="my-dropdown-content-classname"
                                    renderToggle={ ( { isOpen, onToggle } ) => (
                                        <Button
                                            icon={ calendar}
                                            label="Code is poetry"
                                            onClick={ onToggle }
                                        />
                                    ) }
                                    renderContent={ () => (
                                        <DropdownContentWrapper paddingSize="none">
                                            <SlotFillProvider>
                                                <DatePicker 
                                                    inline
                                                    selected={ value }
                                                    onChange={ ( value ) => {
                                                            return handleChange( path, value === '' ? undefined : format( value, dateSaveFormat ) )
                                                        }
                                                    }
                                                    dateFormat={ dateFormat }
                                                    showMonthDropdown
                                                    showYearDropdown
                                                ></DatePicker>
                                                <Popover.Slot />
                                            </SlotFillProvider>
                                        </DropdownContentWrapper>
                                    ) }
                                />
                            </>
                        }
                    />
                </FlexItem>
            </VStack>
        </>
    )
};

export const datepickerControlTester = rankWith(
	5, //increase rank as needed
	isDateControl
);

export default withJsonFormsControlProps( TextControl );
