import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "./styles.scss";
import { MdOutlineDeleteSweep } from "react-icons/md";
import NavBar from "../../components/Navbar";
import { addAGist } from "../../services/gistServices";
import { IGistBody } from "../../types/types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  files: Yup.array()
    .of(
      Yup.object().shape({
        fileName: Yup.string().required("Filename is required"),
        content: Yup.string().required("Content is required"),
      })
    )
    .min(1, "At least one file is required"),
});

export default function AddGist() {
  const { register, control, handleSubmit, formState: {isDirty, isValid }, reset } = useForm({
    defaultValues: {
      description: "",
      files: [{ fileName: "", content: "" }],
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const onSubmit = async (data: IGistBody) => {
    try {
      const res = await addAGist(data);
      if (res.status === 201) {
        reset();
        toast.success("Gist created successfully!");
      } else {
        toast.error("Failed to create gist. Please try again.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
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

          <button id="submitGist" type="submit" disabled={!isDirty || !isValid}>
            Create Gist
          </button>
        </div>
      </form>
    </div>
  );
}
