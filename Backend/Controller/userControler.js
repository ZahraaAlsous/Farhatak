import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";

function formatDate(date) {
  if (!(date instanceof Date)) date = new Date(date);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();

    const usersFormatted = users.map((usr) => ({
      ...usr,
      createdAt: usr.createdAt ? formatDate(usr.createdAt) : null,
      updatedAt: usr.updatedAt ? formatDate(usr.updatedAt) : null,
    }));

    res.status(200).send(usersFormatted);
  } catch (error) {
    res.status(500).send(`Data error... ${error}`);
  }
};
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!book) {
      res.status(400).json("Not Found");
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).send(`Data error ${error}`);
  }
};
export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, role, active } =
      req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const newUser = new User(req.body);
    //   const { title } = newBook;
    //   const bookexist = await Books.findOne({ title });

    //   if (bookexist) {
    //     res.status(400).json("the book already exist");
    //   } else {
    // if (newUser.password !== newUser.confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }
    const save = await newUser.save();
    res.status(201).send("saved");
    //   }
  } catch (error) {
    res.status(500).send(`Data error ${error}`);
  }
};

// فيني شفر هون ولكن لازم شيل التشفير من ال ال model لأن وقتها لح يتشفر مرتين
// الأصح التشفير بال model
// export const createUser = async (req, res) => {
//   try {
//     const { name, email, password, phone, role, active } = req.body;

//     if (!password) {
//       return res.status(400).json({ message: "Password is required" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       phone,
//       role,
//       active,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: `Data error: ${error.message}` });
//   }
// };

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userEdit = await User.findByIdAndUpdate(
      id,
      {
        role: req.body.role,
        active: req.body.active,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    //   if (bookDelete) {
    res.status(201).json("EDit done");
  } catch (error) {
    res.status(500).send(`the error is ${error}`);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userDelete = await User.findByIdAndDelete(id);
    //   if (bookDelete) {
    res.status(201).json("delete done");
    // }else{
    //     res.status(201).json("not delete");
    // }
  } catch (error) {
    res.status(500).send(`the error is ${error}`);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const userEdit = await User.findByIdAndUpdate(
      id,
      {
        password: await bcrypt.hash(req.body.password, 10),

        // السطر يلي تحت غلط لأن بخزنها بدون تشفير
        // password: req.body.password,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    //   if (bookDelete) {
    res.status(201).json("EDit done");
  } catch (error) {
    res.status(500).send(`the error is ${error}`);
  }
};

//Count All Users (For The Admin)

export const countUsers = async (req, res) => {
  try {
    const usersCount = await User.countDocuments({ role: "user" });

    res.status(200).json({ usersCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
