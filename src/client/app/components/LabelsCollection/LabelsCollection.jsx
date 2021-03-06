import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../Button';

const LabelHeader = styled.div`
    background-color: #202124;
    line-height: 40px;
    color: white;
    text-indent: 10px;
    &::first-letter {
        text-transform: capitalize;
    }
`;

const LabelButton = styled(Button)`
    width: 110px;
    background-color: white;
    color: black;
    margin: 20px 20px 0 20px;
    height: 40px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    transition: 0.2s ease-in-out;
    &:hover {
        background-color: #eeeeee;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
    }
    &:active {
        background-color: #dddddd;
    }
    &.active {
        background-color: #FF0266;
        color: white;
    }
`;

export default function LabelsCollection(props) {
    let values;
    switch (props.type) {
        case 'boolean':
            values = [true, false];
            break;
        default:
            alert('Unknown label type');
    }

    return (
        <div>
            <LabelHeader className="bold">{props.name}</LabelHeader>
            <div>
                {
                    values.map((e, i) => (
                        <LabelButton
                            key={e}
                            onClick={() => props.onClick(e)}
                            onKeyDown={(evt) => {
                                switch (evt.keyCode) {
                                    // Arrow Up
                                    case 38:
                                        if (evt.target.previousSibling) {
                                            evt.target.previousSibling.focus();
                                        }
                                        break;
                                    // Arrow Down
                                    case 40:
                                        if (evt.target.nextSibling) {
                                            evt.target.nextSibling.focus();
                                        }
                                        break;
                                    default:
                                }
                            }}
                            className={props.value === e && 'active'}
                        >
                            {JSON.stringify(e)}
                        </LabelButton>
                    ))
                }
            </div>
        </div>
    );
}

LabelsCollection.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
