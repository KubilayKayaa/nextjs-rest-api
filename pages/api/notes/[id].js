import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);

        if (!note) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }

      break;

    case "PUT":
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!note) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "DELETE":
      try {
        const deletedNode = await Note.deleteOne({ _id: id });

        if (!deletedNode) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedNode });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};