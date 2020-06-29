import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 25%;
`;

export const BaseButton = styled.button`
  background: #5959b2;
  font-size: 24px;
  color: #fff;
  border: 0;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  max-width: 600px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 30px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  li {
    font-size: 16px;
  }
  h1 {
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-self: center;
    color: #5959b2 !important;
    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    flex: 1;
    border: 1px solid #eeee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;
