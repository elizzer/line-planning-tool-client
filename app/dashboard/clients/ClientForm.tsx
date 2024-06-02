"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import "./styles.css"; // Import CSS file
import { FaPlus } from "react-icons/fa6";

import { ImCross } from "react-icons/im";

interface ClientFormProps {
  data: FormData | null;
  submit: Function;
}
interface FormData {
  name: string;
  metadata: string;
  categories: Object[];
  SPLs: Object[];
}

interface Category {
  name: string;
  metadata: string;
}

interface Special {
  name: string;
}

interface ListInputProps {
  dataList: Category[] | Special[];
  inputs: string[];
  onChange: (name: string, key: string, value: string, index: number) => void;
  onDelete: (name: string, index: number) => void;
  onAdd: (name: string, keys: string[]) => void;
  name: string;
}

function ListInput({
  dataList,
  inputs,
  onChange,
  onDelete,
  onAdd,
  name,
}: ListInputProps) {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    onChange(name, e.target.name, e.target.value, index);
  };

  const addHandler = () => {
    onAdd(name, inputs);
  };

  const deleteHandler = (i: number) => {
    onDelete(name, i);
  };

  return (
    <div>
      <div className="list-header">
        <div>{name}</div>
        <div onClick={addHandler} className="add-button">
          <FaPlus />
        </div>
      </div>
      <div>
        {dataList.map((e, i) => {
          return (
            <div key={i} className="input-row">
              {inputs.map((ei, ii) => {
                return (
                  <input
                    onChange={(e) => {
                      changeHandler(e, i);
                    }}
                    key={ii}
                    type="text"
                    value={(e as any)[ei]}
                    name={ei}
                    placeholder={ei}
                    className="input-field"
                  ></input>
                );
              })}
              <div
                onClick={() => deleteHandler(i)}
                className="delete-button"
              >
                <ImCross />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ClientForm({ data, submit }: ClientFormProps) {
  const [formData, setFormData] = useState<any>({
    name: data ? data.name : "",
    metadata: data ? data.metadata : "",
    categories: data ? data.categories : [],
    SPLs: data ? data.SPLs : [],
  });

  const [deleted, setDeleted] = useState({
    categories:[],
    SPLs:[]
  });

  // console.log("client form client data ", data);
  // console.log("client data in state",formData)

  const listChangeHandler = (
    key: any,
    key2: any,
    value: any,
    index: any
  ) => {
    setFormData((prev:any) => {
      (prev[key][index])[key2] = value;
      return { ...prev };
    });
  };

  const listAddHandler = (key: string, keys: string[]) => {
    setFormData((prev:any) => {
      const _tempList = [...prev[key]];
      let _temp: any = {};
      keys.forEach((e) => {
        _temp[e] = "";
      });
      _tempList.push(_temp);
      return { ...prev, [key]: _tempList };
    });
  };

  const listDeleteHandler = (key: string, index: number) => {
    if (data) {
      setDeleted((prev) => {
        const deletedId = formData[key]?.[index]?._id;
        console.log('Deleted id ',deletedId)
        const updatedDeleted=[...prev[key],deletedId]

        return {...prev,[key]:updatedDeleted};
      });
    }
    setFormData((prev) => {
      // console.log("[+]Deleted id ", prev[key][index]?._id);
      let updatedData = (prev[key] as any[]).filter((e, i) => i !== index);
      return { ...prev, [key]: updatedData };
    });
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form",formData);
    submit(formData, deleted);
  };

  const formChangeHandler = (e) => {
    setFormData((prev) => {
      console.log(prev)
      prev[e.target.name] = e.target.value;
      console.log(prev)
      return { ...prev };
    });
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler} className="form-container">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={formChangeHandler}
            placeholder="Client name"
            className="text-field"
          ></input>
        </div>
        <div>
          <textarea
            name="metadata"
            onChange={formChangeHandler}
            value={formData.metadata}
            placeholder="Client metadata"
            className="text-field"
          ></textarea>
        </div>
        <ListInput
          name={"categories"}
          onDelete={listDeleteHandler}
          onAdd={listAddHandler}
          onChange={listChangeHandler}
          dataList={formData.categories}
          inputs={["name", "metadata"]}
        ></ListInput>
        <ListInput
          name={"SPLs"}
          onDelete={listDeleteHandler}
          onAdd={listAddHandler}
          onChange={listChangeHandler}
          dataList={formData.SPLs}
          inputs={["name"]}
        ></ListInput>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
