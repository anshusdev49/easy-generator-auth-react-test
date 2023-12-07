import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useToken } from "../tokenContext";

const Home = () => {
  const {removeToken}=useToken()
  return (
    <>
      <Container>
        <h3 className="text-3xl font-bold underline">Welcome</h3>
        <Button variant="contained" onClick={() => removeToken()}>Log out</Button>
      </Container>
    </>
  )
}
export default Home;
const Container = styled('div')`
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-top: 20px;
`;