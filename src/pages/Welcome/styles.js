import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #f2f2f2;
  padding: 40px;
  justify-content: center;
  align-items: stretch;
`;

export const Brand = styled.Text`
  text-align: center;
  color: #424242;
  font-size: 32px;
  font-weight: bold;
`;

export const Title = styled.Text`
  text-align: center;
  color: #424242;
  font-size: 24px;
  font-weight: normal;
`;

export const TextInformation = styled.Text`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #616161;
  line-height: 21px;
`;

export const Error = styled.Text`
  color: #e37a7a;
  text-align: center;
  margin-top: 10px;
`;

export const Form = styled.View`
  margin-top: 20px;
`;

export const Input = styled.TextInput`
  background-color: #ffffff;
  border-radius: 3px;
  height: 44px;
  padding: 0px 20px;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #7a91ca;
  border-radius: 3px;
  height: 48px;
  padding: 0px 20px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;
`;