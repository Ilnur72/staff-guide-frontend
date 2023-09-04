import { Button, Checkbox, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { StyledTextarea } from "./CustomTextArea";

const UpdateForm = ({ showGuide, setShowGuide, refetch }) => {
  const [checked, setChecked] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submit = async (formData) => {
    try {
      await axios.patch(`/guides/${showGuide.data?._id}`, {
        ...formData,
        age: Number(formData.age),
      });

      toast.success("Foydalanuvchi muvaffaqiyatli Tahrirlandi.");
      setIsNotify(false);
      setShowGuide({ isOpen: false });
      reset();
      refetch();
    } catch (error) {
      if (error.response?.status == 400) {
        error.response?.data.message.map((err) => {
          toast.error(err);
        });
      }
    }
  };
  return (
    <Modal
      hideBackdrop={false}
      open={showGuide.isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
      >
        <h2 className="text-2xl text-center text-primary font-bold">
          Update Guide
        </h2>
        <TextField
          defaultValue={showGuide.data?.title}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#514EF3",
              },
            },
          }}
          {...register("title", { required: true })}
          InputProps={{
            style: { borderRadius: "25px" },
          }}
          variant="outlined"
          size="small"
          label="Title"
        />
        <StyledTextarea
          defaultValue={showGuide.data?.content}
          {...register("content", { required: true })}
          style={{ width: 304 }}
          aria-label="minimum height"
          minRows={2}
          placeholder="Content"
        />
    <div>
      <strong className="text-primary">Barchaga yuborilsinmi ?</strong>
    <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
        />
    </div>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setShowGuide({ isOpen: false });
              setIsNotify(false);
              reset();
            }}
            color="inherit"
            variant="contained"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateForm;