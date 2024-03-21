import React, { useState } from 'react';
import Select from "react-select";
import Switch from "react-switch";
import { LuPlusCircle, LuPenLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlQuestion } from "react-icons/sl";
import DatePicker from 'react-datepicker'; // Import date picker
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker stylesheet
import { RxDragHandleDots2 } from "react-icons/rx";

const CreatePipeline = () => {
    const [singleSwitch, setSingleSwitch] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [autoMoveJob, setAutoMovejob] = useState(false)
    const [stages, setStages] = useState([]);
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleDueDateChange = (date) => {
        setDueDate(date);
    };
    const handleSingleSwitchChange = (checked) => {
        setSingleSwitch(checked);
    };
    const handleAutoMoveChange = (checked) => {
        setAutoMovejob(checked)
    }
    const [switches, setSwitches] = useState([
        { name: 'Account ID', checked: false },
        { name: 'Priority', checked: false },
        { name: 'Days on stage', checked: false },
        { name: 'Account tags', checked: false },
        { name: 'Start date', checked: false },
        { name: 'Name', checked: false },
        { name: 'Due date', checked: false },
        { name: 'Description', checked: false },
        { name: 'Assignees', checked: false },
        // Add more switches as needed
    ]);

    const handleSwitchChange = (index, checked) => {
        const updatedSwitches = [...switches];
        updatedSwitches[index].checked = checked;
        setSwitches(updatedSwitches);
    };

    // Divide switches into three columns
    const columnCount = 3;
    const switchesPerColumn = Math.ceil(switches.length / columnCount);

    const handleAddStage = () => {
        // Duplicate the last stage and add it to the stages array
        const lastStage = stages[stages.length - 1];
        const newStage = { ...lastStage };
        setStages([...stages, newStage]);
    };
    useState(() => {
        handleAddStage();
    }, []);
    const handleDeleteStage = (index) => {
        const updatedStages = [...stages];
        updatedStages.splice(index, 1);
        setStages(updatedStages);
    };
    return (
        <>
            <div className='create-pipeline-container col-10'>
                <h1 className='pipeline-heading'>Pipelines</h1>
            </div>
            <div className='pipelines-form col-10'>
                <div className='form-header'>
                    <h3>Create Pipeline</h3>
                    <hr />
                </div>
                <div className='form-area'>
                    <div className='create-form col-6'>
                        <div>
                            <label style={{ fontSize: '14px' }}>Pipeline Name</label>
                            <input type='text' placeholder='Pipeline Name' className='pipeline-input' />
                        </div>
                        <div className='select-container'>
                            <div className='label-container'>
                                <label>Available to</label>
                            </div>
                            <Select className='select-dropdown' placeholder="Available to" />
                        </div>
                        <div className='select-container'>
                            <div className='label-container'>
                                <label>Sort jobs by</label>
                            </div>
                            <Select className='select-dropdown' placeholder="Sort jobs by" />
                        </div>
                        <div className='select-container'>
                            <div className='label-container'>
                                <label>Default job template</label>
                            </div>
                            <Select className='select-dropdown' placeholder="Default job template" />
                        </div>


                        <div className='job-cards-fields col-10'>
                            <div className='job-card-header'>
                                <h3>Job card fields</h3>
                            </div>
                            <div className='job-cards-lists' >
                                {/* Render switches in three columns */}
                                {[...Array(columnCount)].map((_, columnIndex) => (
                                    <div key={columnIndex} style={{ flex: 1 }}>
                                        {switches.slice(columnIndex * switchesPerColumn, (columnIndex + 1) * switchesPerColumn).map((item, index) => (
                                            <div key={index} className="switch-container" >
                                                <Switch
                                                    onChange={(checked) => handleSwitchChange(columnIndex * switchesPerColumn + index, checked)}
                                                    checked={item.checked}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="vl"></div>
                    <div className="col-6" style={{ margin: '10px 0 0 10px', }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='col-6' style={{ display: 'flex', alignItems: 'center', gap: '20px', }} >
                                <p>Default recurrence setting</p>
                                <SlQuestion style={{ cursor: 'pointer', color: 'blue' }} />
                            </div>

                            <div className="switch-container" >
                                <Switch
                                    onChange={handleSingleSwitchChange}
                                    checked={singleSwitch}
                                    onColor="#3A91F5"
                                    onHandleColor="#FFF"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={25}
                                    width={45}
                                    className="react-switch"
                                />
                                <span className="switch-label" style={{ cursor: "pointer" }}>Enable recurrence</span>
                            </div>
                        </div>
                        {/* Conditional rendering for additional options */}
                        {singleSwitch && (
                            <div >
                                <ul style={{ display: 'flex', gap: '20px', }} >
                                    <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every year</li>
                                    <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every 3 months</li>
                                    <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every month</li>
                                    <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every week</li>
                                    <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every day</li>
                                </ul>

                                <div style={{ marginTop: '20px' }}>
                                    <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Recurrence period</h2>
                                    <div className='col-12' style={{ display: 'flex', gap: '5px' }}>
                                        <div className='col-6' >
                                            <label style={{ fontSize: '14px' }}>Start Date</label>
                                            <div>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleStartDateChange}
                                                    className="date-picker-input "

                                                />
                                            </div>

                                        </div>
                                        <div className='col-6'>
                                            <label style={{ fontSize: '14px' }}>Due Date</label>
                                            <div>
                                                <DatePicker selected={dueDate} onChange={handleDueDateChange} className="date-picker-input " />
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <div className='col-6' style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '20px 0 10px 0', }}>
                                        <h2 style={{ fontSize: '18px' }}>Repeats every</h2>
                                        <SlQuestion style={{ cursor: 'pointer', color: 'blue' }} />
                                    </div>
                                    <div className='col-12' style={{ display: 'flex', gap: '5px' }}>
                                        <input type='text' className='col-3 day-input' />
                                        <Select className='col-3' />
                                        <p style={{ marginTop: '10px', textAlign: 'center' }} className='col-2'>on the</p>
                                        <Select className='col-4' />
                                    </div>
                                </div>


                            </div>

                        )}
                    </div>
                </div>


            </div>
            <div className='create-stages col-10' style={{ margin: '20px 0 10px 10px', }}>
                <div className='stages-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Stages</h3>
                    
                    <button className=' col-2' onClick={handleAddStage} style={{border:'none',backgroundColor:'#e4e9f7' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'blue',  fontSize: '15px', cursor: 'pointer', }}>
                                <LuPlusCircle />
                                <span>Add stages</span>
                            </div>
                        </button>

                </div>
                <hr />
                <div className='stages col-12' style={{ display: 'flex', gap: '10px', overflowX:'auto' , marginBottom:'10%'}}>
                    {stages.map((stage, index) => (
                        <div key={index} className='stage-board col-3' style={{ height: 'auto', marginTop: '20px', borderRadius: '10px', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", backgroundColor:"#f0f0f0" }}>
                            {/* Render stage content */}
                            <div style={{ margin: '10px' }}>
                                <div className='board-header' style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <RxDragHandleDots2 />
                                    <div className="input-icon">
                                        <LuPenLine className="edit-icon" />
                                        <input type="text" placeholder="Stage Name" style={{ border: 'none', padding: '10px' }} />
                                    </div>
                                    <RiDeleteBin6Line style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteStage(index)} />
                                </div>
                                <hr />
                                <div className='stage-body'>
                                    <h3 style={{ fontSize: '15px', margin: '5px 0 5px 0' }}>Stage conditions</h3>
                                    <p style={{ fontSize: '14px' }}>First stage can't have conditions</p>
                                    <br />
                                    <h3 style={{ fontSize: '15px', margin: '5px 0 5px 0' }}>Automations</h3>
                                    <p style={{ fontSize: '14px' }}>Triggered when job enters stage</p>
                                    <br />
                                    <li style={{ listStyle: 'none', cursor: 'pointer', color: 'blue', fontWeight: 'bold' }}>add automove</li>
                                    <br />
                                    <h3 style={{ fontSize: '15px', margin: '5px 0 5px 0' }}>Automove</h3>
                                    <p style={{ fontSize: '14px' }}>Move jobs automatically when linked actions are completed</p>
                                    <div className="switch-container" style={{ marginTop: '10px' }}>
                                        <Switch
                                            onChange={handleAutoMoveChange}
                                            checked={autoMoveJob}
                                            onColor="#3A91F5"
                                            onHandleColor="#FFF"
                                            handleDiameter={20}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={25}
                                            width={45}
                                            className="react-switch"
                                        />
                                        <span className="switch-label" style={{ cursor: "pointer" }}>Automove jobs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='add-stage-btn col-3' style={{ marginTop: '20px' }}>
                        <button className='col-12' onClick={handleAddStage}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'blue', padding: '15px', fontSize: '15px', cursor: 'pointer' }}>
                                <LuPlusCircle />
                                <span>Add stages</span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
            <footer className="footer col-10">
              <div className='footer-btns col-6' style={{display:'flex', gap:'10px', marginLeft:'10px'}}>
                 <button type='submit' style={{ padding:'10px', borderRadius:'10px', cursor:'pointer', background:'blue', color:'#fff', border:'none', fontSize:'15px'}} className='col-2'>Save</button>
                 <button type='reset' style={{ padding:'10px', borderRadius:'10px', cursor:'pointer', background:'#fff', color:'blue', border:'1px solid blue', fontSize:'15px'}} className='col-2'>Cancle</button>
              </div>
            </footer>
        </>
    );
}

export default CreatePipeline;
