import React, { Component } from 'react';
//components
import CaseFile from './CaseFile';
import '../../css/casesStyles/ViewCase.css'

class caseFilesList extends Component {
    render() {
        return (
            <div className="caseFilesList" style={{display: 'flex', alignItems:'center'}}>
                <CaseFile title="sample.docx"/>
                
                <label>
                    <CaseFile isAdd={true}/>
                    <input type="file" style={{display: 'none'}}/>
                </label>
            </div>
        );
    }
}

export default caseFilesList;