import React, { Component } from 'react'; //---- import React và Component vào ----
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

import './App.css';

class Review extends Component { // Tạo 1 component để chứa và hiển thị kết quả
  constructor(props) {
    super(props);

    this.state = { // thông tin thu thập sẽ đc lưu dưới dạng state
      name: '',
      gender: '',
      age: '',
    };
  }

  componentWillMount() { //----Method của React -_- để gán giá trị đó  
    const { steps } = this.props;
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = { //-------- Thêm cái này vào để quản lý kiểu dữ liệu
  steps: PropTypes.object,
};

Review.defaultProps = { //----- cái này bên React -_- nói thêm nhức não
  steps: undefined,
};
//----------------------------Phần này là tạo theme cho botchat------------------
const theme = {
  background: '#f5f8fb', 
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};
//-------------------------------------------------------------------------------

//---------------------------------Dưới này là phần câu lệnh chat của bot--------
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle="Bot bé bỏng xinh đẹp" //------- tên con bot xuất hiện trên chat---
        speechSynthesis={{ enable: true, lang: 'vi'}} //-----Cho bot chat nói, mé a để tiếng Việt hn ko nhận mô, e muốn để tiếng a thì 'en', pháp thì 'fr'
        recognitionEnable={true} //---------Cho phép botchat thu âm ng dùng-----
        botDelay='2000' //-----Delay 2s mỗi lần bot gửi chat-----
        steps={[
          {
            id: '1', //----id của step----
            message: 'Xin Chào', //---- lời thoại của con bot ----
            trigger: '2', //---- sau khi hết step này sẽ nhảy sang step có id là 2---
          },
          {
            id: '2',
            message: 'Tôi là Bot bé bỏng xin đẹp!',
            trigger: '3',
          },
          {
            id: '3',
            message: 'Bạn bật âm lượng lên đi, bạn có thể nghe tôi nói được đấy :))',
            trigger: '4',
          },
          {
            id: '4',
            message: 'Bạn có muốn biết vì sao tôi nói tiếng Việt như sh*t ko?',
            trigger: '5',
          },
          {
            id: '5',
            options: [ //---- Đây là option tùy vào giá trị ng dùng chọn mà hn sẽ thực hiện tương tự
              { value: 1, label: 'Có', trigger: '6' },  //---- Đây có value label và trigger tương ứng
              { value: 2, label: 'Không', trigger: '9' },
            ],
          },
          {
            id: '6',
            message: 'Tại tôi méo có bản ngôn ngữ tiếng Việt, chỉ có tiếng Anh thui',
            trigger: '7',
          },
          {
            id: '7',
            message: 'Mà thằng tạo ra tui cứ bắt tui nói tiếng Việt đó chơ, tôi nói tiếng a cho bạn xem nè!',
            trigger: '8',
          },
          {
            id: '8',
            message: 'My creator is an ASSHOLE!',
            trigger: '10',
          },
          {
            id: '9',
            message: "Nghe đi mà, tôi năn nỉ bạn đó :'(",
            trigger: '4',
          },
          {
            id: '10',
            message: 'Tốt nhất là bạn tăt âm đi cho đỡ nhức đầu :)))',
            trigger: '11',
          },
          {
            id: '11',
            message: 'Giờ nói chuyện nghiêm túc nà! Ahihi',
            trigger:'1a',
          },
          {
            id: '1a',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true, //------ Lượt ng dùng chat
            trigger: '3a',
          },
          {
            id: '3a',
            message: 'Hi {previousValue}! What is your gender?', //---- previousValue là giá trị nhận vào của lệnh chat trc đó
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: '5a' },
              { value: 'female', label: 'Female', trigger: '5a' },
            ],
          },
          {
            id: '5a',
            message: 'How old are you?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: '7a',
            validator: (value) => { //----Kiểm tra loại cũng như giá trị ng dùng nhạp vào----
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },
          {
            id: '7a',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />, //----- hiển thị component, cái này của ReactJS e thích thì tự đọc thêm nha
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7a',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7a',
          },
          {
            id: 'update-age',
            update: 'age',
            trigger: '7a',
          },
          {
            id: 'end-message',
            message: 'Cảm ơn bạn đã cung cấp thông tin cho tôi!',
            end: true, //----- kết thúc chat
          },
        ]}
      />
    </ThemeProvider>
  );
}
//------------------------------------------------------------------------------
export default App; //----- export App để truyền vào index.js rùi render ra root trong public/index.html
