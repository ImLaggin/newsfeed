import React,{ useEffect, useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Paper,
  Typography,
  Button,
  InputBase,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetch } from "../redux/trend";
import { fetchSearch } from "../redux/search";
import { feedAdded } from "../redux/feed";
import { logout } from "../redux/login";
import { useNavigate } from "react-router-dom";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [feed, setFeedData] = useState({ text: "", gif: [], title: "" });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    await dispatch(fetch()).then((res) => setData(res.payload.data));
  };
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  var feedData = useSelector((state) => state.feed.data).map((feed) => {
    console.log(feed);
    const answer = AES.decrypt(feed.text, "secret key").toString(
      CryptoJS.enc.Utf8
    );
    const title = AES.decrypt(feed.title, "secret key").toString(
      CryptoJS.enc.Utf8
    );
    return { ...feed, text: answer, title: title };
  });

  const getSearch = async (search) => {
    await dispatch(fetchSearch(search)).then((res) => {
      setData(res.payload.data);
    });
  };

  const handleChange = (e) => {
    console.log(search);
    if (search.length === 1) {
      getData();
    } else {
      getSearch(search);
    }
  };

  const handleGifClick = (url) => {
    var gifs = feed.gif;
    gifs.push(url);
    setFeedData({ ...feed, gif: gifs });
  };

  const handleFeed = () => {
    if (feed.text.length > 0 && feed.title.length > 0) {
      var feedEncrypted = AES.encrypt(feed.text, "secret key").toString();
      console.log(
        console.log(
          AES.decrypt(feedEncrypted, "secret key").toString(CryptoJS.enc.Utf8)
        )
      );
      var feedEncryptedTitle = AES.encrypt(feed.title, "secret key").toString();

      dispatch(
        feedAdded({ ...feed, text: feedEncrypted, title: feedEncryptedTitle })
      );
      setFeedData({ text: "", gif: [], title: "" });
    }
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={3} alignItems='center'>
        <Grid item xs={11}>
          <h1>Post Your Feeds</h1>
        </Grid>
        <Grid item xs={1}>
          <Button variant='outlined' onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Grid>
      </Grid>
      <TextField
        label='Title'
        value={feed.title}
        fullWidth
        onChange={(e) => setFeedData({ ...feed, title: e.target.value })}
      />
      <Box
        sx={{
          overflowY: "scroll",
          maxHeight: "300px",
        }}
      >
        <TextField
          sx={{}}
          label='Posts'
          fullWidth
          placeholder="What's on your mind"
          multiline
          rows={4}
          value={feed.text}
          onChange={(e) => setFeedData({ ...feed, text: e.target.value })}
        />
        <Box>
          {feed.gif.length > 0 &&
            feed.gif.map((gif, index) => (
              <Box key={index} sx={{ maxWidth: "400px" }}>
                <img
                  src={gif}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            ))}
        </Box>
      </Box>
      <Button
        variant='contained'
        sx={{ background: "#888888" }}
        onClick={() => {
          setLoading((prevState) => !prevState);
          getData();
        }}
      >
        Search GIF
      </Button>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <InputBase
              placeholder='Search'
              sx={{
                width: "100%",
                borderRadius: "20px",
                border: "1px solid black",
                p: 2,
              }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleChange(e);
              }}
            />
          </Box>
          <Box
            sx={{
              height: "400px",
              overflowY: "scroll",
              origin: "0",
              width: "700px",
              mx: "auto",
            }}
            spacing={2}
          >
            {data &&
              data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    margin: "15px auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.images.original.url}
                    alt='test'
                    sx={{
                      width: "50%",
                      height: "50%",
                      borderRadius: "20px",
                      mx: "auto",
                    }}
                    onClick={() => handleGifClick(item.images.original.url)}
                  />
                </div>
              ))}
          </Box>
        </div>
      )}
      <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
        <Button variant='contained' onClick={handleFeed}>
          Add Feed
        </Button>
      </Box>
      {feedData &&
        feedData.map((item, index) => (
          <div key={index}>
            <Stack
              sx={{
                border: "1px solid #222",
                p: 1,
                borderRadius: "20px",
                maxHeight: "800px",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  py: 1,
                  px: 2,
                }}
              >
                <h1>{item.title}</h1>
                <Typography fontSize={"20px"}>{item.text}</Typography>
              </Paper>
              {item.gif.map((gif, index) => (
                <Box maxWidth={"300px"} key={index}>
                  <img
                    src={gif}
                    alt='test'
                    sx={{
                      width: "50%",
                      height: "50%",
                      borderRadius: "20px",
                      mx: "auto",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </div>
        ))}
    </Stack>
  );
};

export default Home;
