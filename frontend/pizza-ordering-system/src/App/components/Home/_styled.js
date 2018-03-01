import styled from 'styled-components';

const HomeView = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background: #f7f7f7;
  border-bottom: 1px solid #fff;
  text-align: left;
`

const AddressInput = styled.input`
  width: 500px;
  height: 50px;
  margin: 35px 0 0 65px;
  padding: 0 25px;
  border: 1px solid #eee;
  color: #333;

  :hover {
    box-shadow: 0px 1px 10px 1px #eee;
  }

  ::placeholder {
    color: #bbb;
  }
`

const MapView = styled.div`
  width: 100%;
  height: calc(100% - 150px);
  position: relative;
`

export {
  HomeView,
  Header,
  AddressInput,
  MapView,
};