import styled from 'styled-components';

const HomeView = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const HeaderView = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background: #f9f9f9;
`

const MapView = styled.div`
  width: 100%;
  height: calc(100% - 150px);
  position: relative;
`

const SearchBox = styled.input`
  width: 400px;
  height: 40px;
  margin-top: 36px;
  padding: 0 25px;
  border: 1px solid #eee;
  color: #333;
  -webkit-transition: all 0.15s ease;
  -moz-transition: all 0.15s ease;
  -o-transition: all 0.15s ease;
  transition: all 0.15s ease;

  :hover {
    box-shadow: 0px 1px 10px 1px #eee;
  }

  ::placeholder {
    color: #bbb;
  }
`

export {
  HomeView,
  HeaderView,
  MapView,
  SearchBox,
};