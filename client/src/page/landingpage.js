import React, { useState, useEffect } from 'react';
import '../css/page_css/landingpage.css';
import Swal from "sweetalert2";
function LandingPage() {
  const [selectTopic, setSelectTopic] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [imgName, setImgName] = useState(null);

  const [state, setState] = useState({
    name: "",
    email: "",
    detail: "",
});

const { name, email, detail } = state;

  useEffect(() => {
    console.log(selectTopic);
  }, [selectTopic]);

  const login = () => {
    console.log(login)
  }

      const handleSubmit = (e) => {
        e.preventDefault();
        try {
        const info = {
          name: name,
          email: email,
          detial: detail,
          selectTopic: selectTopic,
          imgName: imgName
        }
        Swal.fire({
          icon: 'error',
          title: 'Limit Exceeded',
          text: 'Activity detail should not exceed 10 MB',
      });
        console.log(info)
    } catch(err) {
      console.error(err)
    }
  }

  const inputValue = (name) => (event) => {
        
    setState({ ...state, [name]: event.target.value });

};

  const handleSelectTopic = (e) => {
    const element = document.getElementById('3');
    element?.scrollIntoView({
      behavior: 'smooth'
    })
    setSelectTopic(e);

  };

  const slide = () => {
    const element = document.getElementById('2');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      setImgName(file.name); 
      console.log(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  
  return (
    <div className='container'>
      <section className='first-section'>
        <header className='landingpage-header'>
          <img className='disable-select header-img'  src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2FLogo-EPc-2%20-%20Copy.png?alt=media&token=48258580-bb51-45d6-acd0-605dbfe1eff4' alt='NIPA CLOUD ICON'></img>
          <a className='disable-select button-color medium font-white-color login-button' onClick={() => login()}>ลงชื่อเข้าใช้งาน</a>
        </header>
        <div className='landing-page-1 font-primary'>
          <div className='landing-text'>
            <h1>SUPPORT TICKET</h1>
            <p>หากคุณติดปัญหา, มีข้อสงไสยหรือมีไอเดียที่อยากเสนอสามารถแจ้งเราได้ผ่านทางปุ่มด้านล่างนี้</p>
            <a className='pick-button medium button-color' onClick={() => slide()}>คลิกปุ่มนี้</a>

          </div>
          <img className='extralight landing-img' src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2F%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%20(47).png?alt=media&token=ef0e2c9e-19d2-44b5-a427-02a37bf47986' alt='cloud server'></img>
        </div>
      </section>
      <section className='landing-page-2 font-white-color' id='2'>
        <div className='landing-page-2-container'>
          <div className='page2-header'>
            <h1>เลือกหัวข้อแจ้งปัญหา</h1>
          </div>
          <div className='card-container'>
            <div className='card font-primary' onClick={() => handleSelectTopic("ปัญหาด้านเว็ปไซต์")}>
              <img src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2Fwebsite_issue_1.png?alt=media&token=9f6a2c32-a030-4738-90ac-2e9fcea34b95' alt='website problem'></img>
              <p className='medium'>ปัญหาด้านเว็ปไซต์</p>
              <p className='info light'>หากคุณพบเจอปัญหาในเว็ปไซต์หรือพบเจอบัคต่างๆสามารถเลือกหัวข้อนี้ได้เลย</p>
            </div>
            <div className='card font-primary' onClick={() => handleSelectTopic("ปัญหาเซิฟเวอร์")}>
              <img src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2Fserver_issue.png?alt=media&token=a7f97114-aa49-4b9e-878d-225f834b8f89' alt='server problem'></img>
              <p className='medium'>ปัญหาเซิฟเวอร์</p>
              <p className='info light'>หากคุณติดปัญหาด้านอินเทอร์เน็ตเซิฟเวอร์ช้า หรือ เซิฟเวอร์มีปัญหาก็สามารถเลือกหัวข้อนี้ได้เลย</p>
            </div>
            <div className='card font-primary' onClick={() => handleSelectTopic("ปัญหาการโอนเงิน")}>
              <img src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2Ftransection_issue.png?alt=media&token=7077e4e7-b528-4aff-9e81-b92c780cc855' alt='transaction problem'></img>
              <p className='medium'>ปัญหาการโอนเงิน</p>
              <p className='info light'>หากคุณพบเจอปัญหาในเว็ปไซต์หรือพบเจอบัคต่างๆสามารถเลือกหัวข้อนี้ได้เลย</p>
            </div>
            <div className='card font-primary' onClick={() => handleSelectTopic("ปัญหาอื่นๆ")}>
              <img src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2Fidea.png?alt=media&token=7cad693b-6492-41a3-9b7e-3927335a693a' alt='other problem'></img>
              <p className='medium'>ปัญหาอื่นๆ</p>
              <p className='info light'>หากไม่มีหัวข้อใดต่อไปนี้ที่เข้าข่าย คุณสามารถเลือกหัวข้อนี้ได้เลย</p>
            </div>
          </div>
        </div>
      </section>
      <section className='landing-page-3'>
        <div id='3' className='page3'>
          <div className='create_ticket_header font-primary'>
            <h1>CREATE TICKET</h1>
          </div>
          <div className='page3-container'>
            <div className='left-side'>
              <div className='inner-box1'>
                <img className='disable-select' src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2Fcreate-ticket.png?alt=media&token=0b09f2f1-8019-4c79-8167-cfaf4c8ba1b5' alt='info problem'></img>
              </div>
            </div>
            <div className='right-side'>
              <div className='inner-box2'>
                {selectTopic ?
                (
                  <form className='submitForm' onSubmit={handleSubmit}>
                  {selectTopic && <h2 className='topic medium font-primary'>หัวข้อ :&nbsp;<span className='font-secondary'>{selectTopic}</span></h2>}
                  <input value={name} onChange={inputValue("name")} className='regular' type='text' placeholder='ชื่อ-นามสกุล'></input>
                  <input value={email} onChange={inputValue("email")} className='regular' type='email' placeholder='Email'></input>
                  <textarea  value={detail} onChange={inputValue("detail")} className='regular' placeholder='กรอกรายละเอียด'></textarea>
                  <div className='image-input'>
                    <div className='select-image'>
                      {imgName && <div className='filename background-color'><img src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2Fimage.png?alt=media&token=f72c9825-2db9-4c8d-933a-601ede2e9c4e' alt='image'></img><p>{imgName}</p></div>}
                      <input className='regular disable-select' id="uploadButton" onChange={handleFileChange} type='file' placeholder='เลือกรูปภาพ'></input>
                      <label for='uploadButton' className='disable-select button-color medium img-button'>เลือกรูปภาพ</label>
                    </div>
                  </div>
                  <input type='submit' className='regular submit-button bold button-color' value="ส่งแบบฟอร์ม" />
                </form>
                  )
                  : (
                    <div className='submitForm' >
                      <h2 className='topic medium font-primary'>หัวข้อ :&nbsp;<span className='font-secondary'>ยังไม่ได้เลือกหัวข้อ</span></h2>
                      <input value={name} onChange={inputValue("name")} className='regular' type='text' placeholder='ชื่อ-นามสกุล'></input>
                  <input value={email} onChange={inputValue("email")} className='regular' type='email' placeholder='Email'></input>
                  <textarea  value={detail} onChange={inputValue("detail")} className='regular' placeholder='กรอกรายละเอียด'></textarea>
                  <div className='image-input'>
                    <div className='select-image'>
                      {imgName && <div className='filename background-color'><img src='https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/website-image%2Fimage.png?alt=media&token=f72c9825-2db9-4c8d-933a-601ede2e9c4e' alt='image'></img><p>{imgName}</p></div>}
                      <input className='regular disable-select' id="uploadButton" onChange={handleFileChange} type='file' placeholder='เลือกรูปภาพ'></input>
                      <label for='uploadButton' className='disable-select button-color medium img-button'>เลือกรูปภาพ</label>
                    </div>
                  </div>
                    <button onClick={() => slide()} className='regular submit-button bold button-color' >เลือกหัวข้อแจ้งปัญหา</button>
                    </div>
                  )
                  }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage