import React from 'react';
import styled from 'styled-components';

import { SickResBody } from '@/api';
import { RecommendItem } from '@/pages/home/componnent/RecommendItem';
import { colors } from '@/styles/colors';

interface Props {
  recommend: SickResBody[];
  searchWord: string;
}

export const RecommendList: React.FC<Props> = (props) => {
  const { recommend, searchWord } = props;
  return (
    <List>
      <ListTitle>추천 검색어</ListTitle>
      {recommend &&
        recommend.length > 0 &&
        recommend.map((item) => {
          return (
            <RecommendItem
              key={`Item${item.sickCd}`}
              sickCd={item.sickCd}
              sickNm={item.sickNm}
              searchWord={searchWord}
            />
          );
        })}
    </List>
  );
};

const List = styled.ul`
  width: 100%;
  max-width: 500px;
  height: 350px;

  margin: 16px auto 0;
  background: ${colors.white};
  border-radius: 5px;
  padding: 16px;
  list-style: none;
  overflow-y: scroll;
`;

const ListTitle = styled.div`
  font-size: 8px;
  margin-bottom: 8px;
  color: ${colors.grey600};
`;
