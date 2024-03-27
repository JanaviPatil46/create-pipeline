import React, { useState } from 'react'
import { LuPlusCircle } from "react-icons/lu";
import Select from "react-select";
import { RxDragHandleDots2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
const SendEmail = () => {
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
  const [emails, setEmails] = useState([{ id: 1 }]);
  const handleAddEmail = (action) => {
    if (action === 'Send email') {
      // Increment the number for the new folder
      const newEmailNumber = emails.length + 1;
      const newEmail = { id: newEmailNumber };
      setEmails([...emails, newEmail]);
      setShowAutoMovesDropdown(false);
    }
  };

  const handleDeleteEmail = (id) => {
    // Filter out the folder with the given id
    const updatedEmails = emails.filter(email => email.id !== id);
    // Update the ids of remaining folders
    const updatedEmailsWithIds = updatedEmails.map((email, index) => ({ ...email, id: index + 1 }));
    setEmails(updatedEmailsWithIds);
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
      <div className='email-content col-12' style={{ padding: '20px', display: 'flex', flexDirection: 'column',  }}>
        <div className='email-template col-12' style={{ display: 'flex', gap: '10px', marginBottom: '5%', flexDirection: 'column' }}>
          {emails.map((email, index) => (
            <div key={email.id} className="folder-card" style={{ border: '1px solid #B2BEB5', borderRadius: '10px', padding: '10px' }}>
              {/* Render folder content */}
              <div className='email-header col-12' style={{ display: 'flex', justifyContent: 'space-between', }}>
                <div className='email-header-title-first col-10' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                  <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', }}>
                    <RxDragHandleDots2 />
                    <h2 style={{ fontSize: '20px' }}>{email.id}. Send Email</h2>
                  </p>
                </div>
                <div className='email-header-title-second col-4' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', float: 'right' }}>
                  <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: 'blue', cursor: 'pointer', display: 'flex', gap: '5px' }}>
                      <MdAlternateEmail /> <h5>New template</h5>
                    </div>
                    <RiDeleteBin6Line style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteEmail(email.id)} />
                  </p>
                </div>
              </div>
              <div className='email-body' style={{ paddingTop: '50px' }}>
                <div className='select-container'>
                  <div className='label-container'>
                    <label>Select template</label>
                  </div>
                  <Select className='select-dropdown' placeholder="Select template" />
                </div>
                <div className='conditions' style={{ marginTop: '20px' }}>
                  <li style={{ listStyle: 'none', cursor: 'pointer', color: 'blue', fontWeight: '550' }} onClick={handleAddConditions}
                  >add conditions</li>
                </div>
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
                  <li key={index} onClick={() => handleAddEmail(action)}>{action}</li>
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

export default SendEmail