import React, {useState} from "react";
import "./Result.css";
import {Input, Card} from "../../components";
import * as emoji from "emoji-api";
const Result = () => {
  //useState variables
  const [emojiImg, setEmojiImg] = useState("");
  const [emojiDet, setEmojiDet] = useState({
    image: "",
    name: "",
    sub_group: ""
  });
  const [joke, setJoke] = useState();

  //All functions...

  function handleChange(e) {
    const {value} = e.target;
    setEmojiImg(value.toString());
  }

  function handleClick() {
    console.log("started....");
    const det = emoji.get(emojiImg);
    const {
      _data: {name, sub_group}
    } = det;
    console.log(name, sub_group);
    setEmojiDet({
      image: emojiImg,
      name: name,
      sub_group: sub_group
    });
    setEmojiImg("");
  }
  const handleJoke = async () => {
    // fetch("https://v2.jokeapi.dev/")
    //   .then((res) => res)
    //   .then((data) => console.log(data));
    fetch("https://hindi-quotes.vercel.app/random")
      .then(response => response.json())
      .then(data => setJoke(data.quote));
    console.log("joke generated");
  };
  // return (
  //   <>

  //   </>
  // );
  return (
    <>
      <div className='resCont flex flex-col items-center justify-evenly h-[85vh] '>
        <button
          className='bg-orange-500 text-white p-4  hover:drop-shadow-2xl'
          onClick={handleJoke}>
          Give Quote
        </button>
        <p>{joke}</p>
        <Input
          btnAction={handleClick}
          inpAction={handleChange}
          inpVal={emojiImg}
        />
        {emojiDet.name && (
          <Card
            emjImg={emojiDet.image}
            emjName={emojiDet.name.toUpperCase()}
            emjSbGrp={emojiDet.sub_group}
            emjDescp={`lorem ipsum dolor`}
          />
        )}
      </div>
    </>
  );
};

export default Result;

//Add input and card
//shift all function to result.jsx and configure the props in those components accordingly....
