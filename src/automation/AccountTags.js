import React, { useState } from 'react'
import { LuPlusCircle } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import TagSearch from '../components/TagSearch';
import Switch from "react-switch";
const AccountTags = () => {
    const [existingTags, setExistingTags] = useState(false);
    const [tagSearchDisabled, setTagSearchDisabled] = useState(false); 
    const handleExistingAccountTags = (checked) => {
        setExistingTags(checked);
        setTagSearchDisabled(checked);
    }
    const [showAutoMovesDropdown, setShowAutoMovesDropdown] = useState(false);
    const automoveActionsForm = [
        'Apply folder template',
        'Update account tags',
        'Send invoice',
        'Create organozer',
        'Create task',
        'Send proposal/EL',
        'Send email',
        'Send message',
        'Update account access',
        'Update job assignees',
        'Add wiki page'];
    const [accountTags, setAccountTags] = useState([{ id: 1 }]);
    const handleAddFolder = (action) => {
        if (action === 'Update account tags') {
            // Increment the number for the new folder
            const newAccountTagsNumber = accountTags.length + 1;
            const newAccountTags = { id: newAccountTagsNumber };
            setAccountTags([...accountTags, newAccountTags]);
            setShowAutoMovesDropdown(false);
        }
    };

    const handleDeleteAccountTags = (id) => {
        // Filter out the folder with the given id
        const updatedAccountTags = accountTags.filter(accountTag => accountTag.id !== id);
        // Update the ids of remaining folders
        const updatedAccountTagsWithIds = updatedAccountTags.map((accountTag, index) => ({ ...accountTag, id: index + 1 }));
        setAccountTags(updatedAccountTagsWithIds);
    };
    const [isConditionsFormOpen, setIsConditionsFormOpen] = useState(false);
    const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
    const handleAddConditions = () => {
        setIsConditionsFormOpen(!isConditionsFormOpen);
    };
    const handleGoBack = () => {
        setIsConditionsFormOpen(false);
    };
    const handleCheckboxChange = () => {
        // Function to check if any checkbox is checked
        const checkboxes = document.querySelectorAll('.conditions-content input[type="checkbox"]');
        let isChecked = false;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                isChecked = true;
            }
        });
        setIsAnyCheckboxChecked(isChecked);
    };



    return (
        <>
            <div className='account-tags-content col-12' style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div className='account-tags-template col-12' style={{ display: 'flex', gap: '10px', marginBottom: '5%', flexDirection: 'column' }}>
                    {accountTags.map((accountTag, index) => (
                        <div key={accountTag.id} className="folder-card" style={{ border: '1px solid #B2BEB5', borderRadius: '10px', padding: '10px', }}>
                            {/* Render folder content */}
                            <div className='account-tags-header col-12' style={{ display: 'flex', justifyContent: 'space-between', }}>
                                <div className='account-tags-header-title-first col-10' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', }}>
                                        <RxDragHandleDots2 />
                                        <h2 style={{ fontSize: '20px' }}>{accountTag.id}. Update account tags</h2>
                                    </p>
                                </div>
                                <div className='account-tags-header-title-second col-4'  >
                                    <RiDeleteBin6Line style={{ color: 'red', cursor: 'pointer', float: 'right' }} onClick={() => handleDeleteAccountTags(accountTag.id)} />
                                </div>
                            </div>
                            <div className='account-tags-body' style={{ paddingTop: '50px', }}>
                                <div style={{ display: 'flex', gap: '20px', }}>
                                    <div className='select-container col-6'>
                                        <div className='label-container'>
                                            <label>Add account tags</label>
                                        </div>
                                        <TagSearch />
                                    </div>
                                    <div className='select-container col-6'>
                                        <div className='label-container'>
                                            <label>Remove account tags</label>
                                        </div>
                                        {!tagSearchDisabled && <TagSearch style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }} />}
                                    {tagSearchDisabled && <div style={{ padding: '5px', color: '#ccc', }}>Tag search disabled</div>}
                                    </div>
                                </div>
                                <div className="switch-container" style={{ marginTop: '10px' }}>
                                    <Switch
                                        onChange={handleExistingAccountTags}
                                        checked={existingTags}
                                        onColor="#3A91F5"
                                        onHandleColor="#FFF"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={25}
                                        width={45}
                                        className="react-switch"
                                    />
                                    <span className="switch-label" style={{ cursor: "pointer" }}>Clear existing account tags</span>
                                </div>
                            </div>
                            <div className='conditions' style={{ marginTop: '20px' }}>
                                <li style={{ listStyle: 'none', cursor: 'pointer', color: 'blue', fontWeight: '550' }} onClick={handleAddConditions}
                                >add conditions</li>
                            </div>
                        </div>
                    ))}


                </div>

                <div style={{
                    display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', border: 'none'
                }}>
                    <LuPlusCircle style={{ color: 'blue' }} />
                    <li style={{ listStyle: 'none', cursor: 'pointer', color: 'blue', fontWeight: 'bold' }} onClick={() => setShowAutoMovesDropdown(!showAutoMovesDropdown)} >add automove</li>
                    {showAutoMovesDropdown && (
                        <div className='contditions-automovedrop-down'>
                            <ul>
                                {automoveActionsForm.map((action, index) => (
                                    <li key={index} onClick={() => handleAddFolder(action)}>{action}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>



            </div>

            <div className={`conditions-form-container ${isConditionsFormOpen ? "conditions-form-open" : ""}`}>
                <div className="conditions-header_title" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
                        <IoMdArrowRoundBack style={{ color: 'blue', fontSize: '35px', cursor: 'pointer' }} onClick={handleGoBack} />
                        <div className="conditions-title">Add conditions</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px', color: 'blue', cursor: 'pointer' }}>
                        <LuPlusCircle />
                        <h3 style={{ fontSize: '12px' }}>Add tag</h3>
                    </div>

                </div>

                <div className='conditions-content col-12' style={{ padding: '20px' }}>
                    <div style={{ padding: '10px' }}>
                        <p>Apply automation only for accounts with these tags</p>
                        <div style={{ position: 'relative', marginTop: '20px', }}>
                            <input type="text" placeholder="Search..." style={{ paddingLeft: '30px' }} className="tagsearch" />
                            <AiOutlineSearch style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', fontSize: '20px', }} />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <hr />
                            <div style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px' }}>
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <p>Option 1</p>
                            </div>
                            <hr />
                            <div style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px' }}>
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <p>Option 2</p>
                            </div>
                            <hr />
                            <div style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px' }}>
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <p>Option 3</p>
                            </div>
                            <hr />
                            <div style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px' }}>
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <p>Option 4</p>
                            </div>
                            <hr />

                        </div>
                        <div className="conditions-btns col-6" style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>

                            <button type="submit" style={{ padding: '10px', borderRadius: '10px', cursor: isAnyCheckboxChecked ? 'pointer' : 'not-allowed', border: 'none', background: isAnyCheckboxChecked ? 'blue' : '#ccc', color: '#fff', fontSize: '15px', width: '80px' }}>Add</button>
                            <button type="button" onClick={handleGoBack} style={{ background: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', border: '1px solid blue', fontSize: '15px', color: 'blue' }}>Cancle</button>
                        </div>

                    </div>

                </div>

            </div>


        </>
    )
}

export default AccountTags