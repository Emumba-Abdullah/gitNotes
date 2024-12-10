import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useGistCreation } from "../../services/hooks/useGistCreation";
import "./styles.scss";
import NavBar from "../../components/navbar";


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
  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
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

  const { onSubmit } = useGistCreation(reset);

  return (
    <div id="gist-container">
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)} id="addGist">
      
        <input
          {...register("description")}
          type="text"
          placeholder="This is a Git Description"
          id="gist-description"
          required
        />

      
        <div id="file">
          {fields.map((item, index) => (
            <div key={item.id} id="file-section">
             
              <div id="filename-container">
                <input
                  {...register(`files.${index}.fileName`, { required: true })}
                  type="text"
                  placeholder="Filename including extension..."
                  id="filename-input"
                />
                
                <button
                  type="button"
                  onClick={() => remove(index)}
                  id="delete-button"
                >
                  <MdOutlineDeleteSweep />
                </button>
              </div>

              
              <div id="editor">
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

        
        <div id="footer-container">
          
          <button
            type="button"
            onClick={() => append({ fileName: "", content: "" })}
            id="add-file-button"
          >
            Add File
          </button>

          <button
            id="submitGist"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Create Gist
          </button>
        </div>
      </form>
    </div>
  );
}
