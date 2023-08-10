import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "js-cookie";
import SideBar from "../components/Sidebar.js";
import Topbar from "../components/Topbar.js";
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { get, put } from "../lib/Requests";

export default function EditorPage(props) {
    const [user, setUser] = React.useState(Cookies.get("username"));
    const [content, setContent] = React.useState("");
    const [title, setTitle] = React.useState("");
    const dataFetchedRef = React.useRef(false);

    const loadData = async () => {
        const id = window.location.pathname.split("/")[3];
        const url = `${process.env.REACT_APP_BACKEND_URL}/${user}/notes/${id}`;
        get(url, {
            success: function (data) {
                console.log(data);
                setTitle(data.title);
                setContent(data.content);
            },
        });
    };

    React.useEffect(() => {
        //prevents double call
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        loadData();
    }, []);

    const title_onchange = (event) => {
        console.log(event.target.value);
        setTitle(event.target.value);
    };

    const content_onchange = (event) => {
        console.log(event);
        setContent(event);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit", content);
        try {
            const id = window.location.pathname.split('/')[3];
            const url = `${process.env.REACT_APP_BACKEND_URL}/${user}/notes`;
            const payload_data = {
                _id: id,
                title: title,
                content: content,
                username: user,
                tags: [],
            };

            put(url, payload_data, {
                success: function () { },
            });
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    return (
        <article>
            <Topbar title="Editor" />
            <SideBar />
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <TextField label="Title" value={title} onChange={title_onchange}></TextField>
                        <Editor
                            value={content}
                            init={{
                                height: 500,
                                menubar: false
                            }}
                            onEditorChange={content_onchange}
                        />
                        <Button type="submit">Submit</Button>
                    </FormControl>
                </form>
            </div>
        </article>
    );
}
