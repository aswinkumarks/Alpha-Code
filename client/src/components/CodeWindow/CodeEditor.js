import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chrome";

const CodeEditor = () => {
  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
    <div>
      <div id="ace_editor_id" />
      <AceEditor
        mode="python"
        theme="chrome"
        onChange={onChange}
        name="ace_editor_id"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

export default CodeEditor;
