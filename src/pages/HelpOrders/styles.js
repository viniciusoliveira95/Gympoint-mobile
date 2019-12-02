import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Button from '~/components/Button';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  padding: 20px 20px 0 20px;
  background: ${colors.backGroundSecundary};
  height: 100%;
  flex: 1;
`;

export const HelpOrderButton = styled(Button)`
  margin-bottom: 20px;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const FlatItem = styled(RectButton)`
  background: ${colors.backGroundPrimary};
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 15px 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  height: 150px;
`;

export const OrderHeader = styled.View`
  flex-direction: row;
`;

export const Answered = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const WithResponse = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #42cb59;
  margin-left: 8px;
`;

export const NoResponse = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.greySubTitle};
  margin-left: 8px;
`;

export const TimeText = styled.Text`
  max-width: 140px;
  font-size: 14px;
  color: ${colors.fontPrimary};
`;

export const OrderBodyText = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-top: 10px;
  flex: 1;
  width: 100%;
  color: ${colors.fontPrimary};
  font-size: 14px;
  line-height: 26px;
  text-align: left;
`;
