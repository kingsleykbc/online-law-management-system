import React from 'react';
//Icons
import WordDoc from 'react-icons/lib/md/chrome-reader-mode';
import Add from 'react-icons/lib/md/add';
import '../../css/casesStyles/CaseFile.css';

const CaseFile = (props) => {
    const add = (!props.isAdd) ? {} : {
        border: '4px dashed #A7C8E6',
        background:"#fff"
    };
    return (
        <div className="caseFile" style={add}>
            <div>
                {props.isAdd? <Add/> : <WordDoc/>}
            </div>
            <div>
                {props.title}
            </div>
        </div>
    );
}
export default CaseFile;

//Note: Use ternery operator like {3<4 ? <Doc/> : 'Happy' } to control d icon
