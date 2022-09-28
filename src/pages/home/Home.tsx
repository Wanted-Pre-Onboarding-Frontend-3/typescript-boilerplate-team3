import { Search } from '@mui/icons-material';
import { Button, InputBase } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import { getManySick, SickResBody } from '@/api';
import { useDebounce } from '@/hook/useDebounce';
import { RecommendList } from '@/pages/home/componnent/RecommendList';
import { colors } from '@/styles/colors';

interface Props {}

export const Home: React.FC<Props> = () => {
  const [sick, setSick] = useState<SickResBody[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');

  const onChangeInputs = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSick([
        {
          sickCd: 'search null',
          sickNm: '검색결과가 없습니다.',
        },
      ]);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data } = await getManySick.request({
      q: event.target.value || '',
    });

    setSick(data);
    setSearchWord(event.target.value);

    return null;
  };

  const debouncedValue = useDebounce(onChangeInputs, 800);

  return (
    <DivWrap>
      <InputContainer>
        <InputWrap>
          <Search />
          <InputBaseWrap onChange={debouncedValue} placeholder="" inputProps={{ 'aria-label': 'search' }} />
        </InputWrap>
        <ButtonWrap aria-label="search">검색</ButtonWrap>
      </InputContainer>
      {sick.length > 0 && <RecommendList recommend={sick} searchWord={searchWord} />}
    </DivWrap>
  );
};
const DivWrap = styled.div`
  background: #d0e8fd;
  height: 100vh;
`;

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
`;

const InputWrap = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
  background-color: white;
`;

const InputBaseWrap = styled(InputBase)`
  && {
    width: 100%;
    margin-left: 8px;
  }

  input {
    width: 100%;
  }
`;

const ButtonWrap = styled(Button)`
  && {
    border-bottom-right-radius: 50px;
    border-top-right-radius: 50px;
    background-color: #357ae1;
    color: ${colors.white};
    -webkit-tap-highlight-color: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
