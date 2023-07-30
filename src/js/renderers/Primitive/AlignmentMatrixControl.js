import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isStringControl } from "@jsonforms/core";
import { 
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
    __experimentalVStack as VStack,
	__experimentalHStack as HStack,
	FormToggle,
	Tooltip,	
    FlexItem,
	__experimentalSpacer as Spacer,

	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	Dropdown,
	Button,
	SlotFillProvider, 
	Popover,
} from '@wordpress/components';

const AlignmentMatrixControlRenderer = ( props ) => {
	const {
		id,
		description,
		label,
		path,
		data,
		handleChange
	} = props;
  
  return ( 
    <>
		<Spacer paddingY={ 2 } marginBottom={ 0 }>
			<HStack justify="space-between">
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
					<Dropdown
						popoverProps={ {
							placement: 'left-start',
							offset: 36,
							shift: true,
						} }
						className="my-container-class-name"
						contentClassName="my-dropdown-content-classname"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								onClick={ onToggle }
								aria-expanded={ isOpen }
								icon={ 
									<AlignmentMatrixControl.Icon
										value = { data }
									/>  
								}
							/>
						) }
						renderContent={ () => (
							<DropdownContentWrapper paddingSize="none">
								<SlotFillProvider>
									<AlignmentMatrixControl
										value = { data }
										onChange = { ( value ) => handleChange( path, value ) }
									/>
									<Popover.Slot />
								</SlotFillProvider>
							</DropdownContentWrapper>
						) }
					/>
				</FlexItem>
			</HStack>
		</Spacer>
	</>
  )
};

export const alignmentMatrixControlTester = rankWith(
	5, //increase rank as needed
	isStringControl
);

export default withJsonFormsControlProps( AlignmentMatrixControlRenderer );
