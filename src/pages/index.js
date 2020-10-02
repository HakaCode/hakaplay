import Carousel from "../components/Carousel";
import Head from "../components/global/Head";
import data from "../../home.json";
export default function Home() {
  return (
    <div>
      <Head />
      <div className="wrapper" style={{ marginTop: 30, marginLeft: "2%" }}>
        {data.list.map((list, index) => (
          <Carousel key={index} title={list.title} results={list.results} />
        ))}
      </div>
    </div>
  );
}
