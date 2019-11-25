import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.backGroundSecundary};
`;

export const Content = styled.View`
  margin: 20px;
  padding: 20px 20px 0 20px;
  background: ${colors.backGroundPrimary};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.fontBold};
`;

export const Time = styled.Text`
  font-size: 14px;
  color: ${colors.fontPrimary};
`;

export const Text = styled.Text`
  margin-bottom: 20px;
  width: 100%;
  color: ${colors.fontPrimary};
  font-size: 14px;
  line-height: 26px;
  text-align: left;
`;
