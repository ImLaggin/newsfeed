import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Paper,
  Typography,
  Button,
  InputBase,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetch } from "../redux/trend";
import { fetchSearch } from "../redux/search";
import { feedAdded } from "../redux/feed";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [feed, setFeedData] = useState({ text: "", gif: [] });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    await dispatch(fetch()).then((res) => setData(res.payload.data));
  };

  var feedData = useSelector((state) => state.feed.data);

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
    if (feed.text.length > 0) {
      dispatch(feedAdded(feed));
      setFeedData({ text: "", gif: [] });
    }
  };

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{ background: "#222", color: "white", py: 3, px: 3 }}
      >
        <Typography fontSize={"30px"} textAlign='center'>
          Post Your Feeds
        </Typography>
      </Paper>
      <Box
        sx={{
          overflowY: "scroll",
          maxHeight: "300px",
          border: "1px solid black",
          p: 3,
        }}
      >
        <InputBase
          sx={{}}
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
                p: 2,
                maxHeight: "800px",
                overflowY: "scroll",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  py: 3,
                  px: 3,
                }}
              >
                <Typography fontSize={"30px"} textAlign='center'>
                  {item.text}
                </Typography>
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
