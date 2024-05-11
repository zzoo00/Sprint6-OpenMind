import React, {useState} from "react";
import styled from "styled-components";
import {colors} from "../styles/colors";
import { Link, useNavigate } from "react-router-dom";
import { getSubject } from "./api";

const Input = styled.input`
  width: 336px;
  height: 46px;
  border: solid 1px ${colors.GRAYSCALE_40};
  border-radius: 8px;
  background-color: #ffffff;
  padding: 12px 40px;

  &:focus {
    border: solid 1px ${colors.BROWN_40};
  }  
`

const QuestionButton = styled.button`
  width: 336px;
  height: 46px;
  background-color: ${colors.BROWN_40};
  cursor: pointer;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    border: solid 2px ${colors.BROWN_50}
  }
`
const UndefindedButton = styled.button`
  width: 336px;
  height: 46px;
  background-color: ${colors.BROWN_30};
  cursor: pointer;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  color: #ffffff;
`

const InputContainer = styled.div`
  width: 100%;
  height: 108px;
  border: none;
  background-color: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`




const PostForm = () => {  
  const navigate = useNavigate();

  const [userId, setUserId] = useState()
  
  const [userName, setUserName] = useState('')
  const handleInput = (event) => {
    setUserName(event.target.value)
    return userName;
  }

  

  const handleSubmit = async () => {
    const jsonObject = await getSubject();

    const nameArray = jsonObject.results.map(item => item.name)
  
    if(nameArray.includes(userName)) {
      const nameIndex = nameArray.indexOf(userName);
      const nameObject = jsonObject.results[nameIndex];
      setUserId(nameObject.id)
      navigate(`post/${nameObject.id}`)
    }else{
       fetch('https://openmind-api.vercel.app/6-7/subjects/?limit=999&offset=0'
        ,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: userName,
            team: "6-7"
      })
    }).then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        const nameObject = jsonResponse.results[0];
        setUserId(nameObject.id);
        navigate(`post/${nameObject.id}`)
    })
      .catch(error => {
      console.error('Error:',error)
  })
}

}
return (
  <InputContainer>
    <Input placeholder='이름을 입력하세요' type='text' onChange={handleInput}/>
    <QuestionButton onClick={handleSubmit}>질문 받기</QuestionButton>
  </InputContainer>
)

}

export default PostForm;