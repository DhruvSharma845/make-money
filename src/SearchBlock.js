import React from 'react';

function CustomSeachBlock({value='', onSubmitValue= f => f}) {
    const [ fieldValue, setFieldValue ] = React.useState(value);

    const onSubmitForm = (event) => {
        event.preventDefault();
        onSubmitValue(fieldValue);
    };
    return (
        <form onSubmit={onSubmitForm}>
            <div>
                Type to search: 
                <input type='text' value={fieldValue} onChange={(event) => setFieldValue(event.target.value)} />
            </div>
        </form>
    );
}

export default CustomSeachBlock;