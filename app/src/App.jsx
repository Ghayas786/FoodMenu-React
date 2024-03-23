import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Component/SearchResult/SearchResult";
export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [Data , setData] = useState(null)
const [loading , setloading] = useState(false)
const [error , seterror] = useState(null)
const [FilterData,setFilterData] = useState(null);
const [selectedBtn ,setselectedBtn]= useState("all")

useEffect(()=>{
  const FetchFoodData = async () => {
    setloading(true)
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json(); // Corrected method name
      setFilterData(json)
      setData(json); 
      setloading(false)
      
  } catch (error) {
     seterror("Unable to fetch Data")
  };
  }  
  FetchFoodData();
},[])
console.log(Data)

const filterFood = (type) => {
  if (type === "all") {
    setFilterData(Data);
    setselectedBtn("all");
    return;
  }

  const filter = Data?.filter((food) =>
    food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilterData(filter);
  setselectedBtn(type);
};

const filterBtns = [
  {
    name: "All",
    type: "all",
  },
  {
    name: "Breakfast",
    type: "breakfast",
  },
  {
    name: "Lunch",
    type: "lunch",
  },
  {
    name: "Dinner",
    type: "dinner",
  },
];

const SearchFood = (e) => {
  const SearchValue = e.target.value;
  console.log(SearchValue);
  if (SearchValue === "") {
    setFilterData(null); // Assuming setFilterData is a state setter function
  }
  const Filter = Data?.filter((food) =>
    food.name.toLowerCase().includes(SearchValue.toLowerCase())
  );
  setFilterData(Filter); // Assuming setFilterData is a state setter function
}


if(error) return <div>{error}</div>
if(loading) return <div>loading.......</div>
  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="./Assects/logo.png" alt="reload"></img>
        </div>
        <div className="search">
          <input onChange={SearchFood} placeholder="Search Food" />
        </div>
      </TopContainer>
      
      <FilterContainer>
      {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
      </FilterContainer>
    <SearchResult data = {FilterData}/>
    </Container>
  );
};

export default App;
export const Container = styled.div` 
max-width: 1200px;
margin: 0 auto;

`;
const TopContainer = styled.section`
min-height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;
.search{
  input{
  background-color: transparent;
  border: 1px solid red;
  color: white;
  border-radius: 5px;
height: 40px;
font-size: 16px;
padding: 0 10px;
  }
}
`;
const FilterContainer = styled.section `
padding-bottom: 20px;
display: flex;
justify-content: center;
gap: 12px;
`;
export const Button = styled.button `
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
background: red;
border-radius: 5px;
padding: 6px 12px;
color: white;
border: none;
cursor: pointer;
&:hover{
background-color: #c40000;
}
`;
