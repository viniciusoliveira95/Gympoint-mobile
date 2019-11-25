import styled from 'styled-components/native';

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

export const CheckinButton = styled(Button)`
  margin-bottom: 20px;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const FlatItem = styled.View`
  background: ${colors.backGroundPrimary};
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 15px 20px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ChckinText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.fontBold};
`;

export const TimeText = styled.Text.attrs({
  numberOfLines: 1,
})`
  max-width: 170px;
  font-size: 14px;
  color: ${colors.fontPrimary};
`;
