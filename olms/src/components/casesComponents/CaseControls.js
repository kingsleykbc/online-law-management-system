import React from 'react';
import '../../css/casesStyles/CaseControls.css';

const CaseControls = (props) => {
    return (
        <div className="caseControls">
            <div onClick={() => { props.toggleBox2('add-clients')}}>Add Client</div>
            <div onClick={props.toggleBox}>Add Case</div>
        </div>
    );
}
export default CaseControls;