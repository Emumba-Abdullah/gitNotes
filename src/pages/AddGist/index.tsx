import { useForm, useFieldArray, Controller } from "react-hook-form";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "./styles.scss";
import { MdOutlineDeleteSweep } from "react-icons/md";
import NavBar from "../../components/Navbar";
import { addAGist } from "../../services/gistServices";
import { IGistBody } from "../../types/types";

export default function AddGist() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      files: [{ fileName: "", content: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const onSubmit =async(data:IGistBody) => {
    console.log("Submitted Data:", data);
    const res = await addAGist(data);
    alert(res.status)
    };

  return (
    <div className="gist-container">
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)} className="addGist">
        <input
          {...register("description")}
          type="text"
          placeholder="This is a Git Description"
          className="description-input"
          id="gist-description"
          required
        />
        <div id="file">
          {fields.map((item, index) => (
            <div key={item.id} className="file-section">
              <div className="filename-container">
                <input
                  {...register(`files.${index}.fileName`, { required: true })}
                  type="text"
                  placeholder="Filename including extension..."
                  className="filename-input"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="delete-button"
                >
                  <MdOutlineDeleteSweep />
                </button>
              </div>

              <div className="editor">
                <Controller
                  name={`files.${index}.content`}

                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CodeMirror
                      {...field}
                      options={{
                        lineNumbers: true,
                      }}
                      onChange={(editor, data, value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="footer-container">
          <button
            type="button"
            onClick={() => append({ fileName: "", content: "" })}
            className="add-file-button"
          >
            Add File
          </button>

          <button id="submitGist" type="submit">
            Create Gist
          </button>
        </div>
      </form>
    </div>
  );
}
