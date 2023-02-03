import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const variable1Array = ["Title", "Quantity", "Price", "Brand"];
const relationObj = {
  int: [
    { name: "Equals", value: "==" },
    { name: "Not Equals", value: "!=" },
    { name: "Greater Than Equals", value: ">=" },
    { name: "Less Than Equals", value: "<=" },
  ],
  str: [
    { name: "Equals", value: "==" },
    { name: "Not Equals", value: "!=" },
    { name: "Contains", value: "%LIKE%" },
    { name: "Not Contains", value: "!%LIKE%" },
  ],
};
function ConditionGenerator() {
  let [conditions, setConditions] = useState([
    { id: 0, variable1: "Title", relation: "==", variable2: "" },
  ]);
  const [result, setResult] = useState("");
  const [orAnd, setOrAnd] = useState(false);

  const onChangeHandler = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) => {
    if (key === "variable1") {
      conditions[i].variable1 = e.target.value;
    } else if (key === "relation") {
      conditions[i].relation = e.target.value;
    } else if (key === "variable2") {
      conditions[i].variable2 = e.target.value;
    }
    setConditions([...conditions]);
  };

  useEffect(() => {
    let condition = "";
    conditions.forEach((ele, i) => {
      if (Object.values(ele).indexOf("") === -1) {
        condition += "(" + ele.variable1 + ele.relation + ele.variable2 + ")";
        if (i!==conditions.length-1) {
          condition += orAnd ? " || " : " && ";
        }
      }
    });
    setResult(condition);
  }, [conditions, orAnd]);

  const addCondition = () => {
    let indEmpty=conditions.findIndex((ele)=>{
      return Object.values(ele).indexOf('')!==-1
    })
    console.log(indEmpty)
    if(indEmpty===-1){
    let obj = {
      id: conditions.length,
      variable1: "Title",
      relation: "==",
      variable2: "",
    };
    conditions.push(obj);
    setConditions([...conditions]);
  }
  else{
    alert('Fill in all the existing condition values to add a new one')
  }
  };

  const deleteCondition = (i: number) => {
    conditions.splice(i, 1);
    setConditions([...conditions]);
  };

  return (
    <Card className="col-6 mx-auto my-2">
      <Card.Header>
        <h3 className="text-center">Condition Generator</h3>
      </Card.Header>
      <Card.Body>
        <div className="d-flex align-items-end gap-2 shorttxt mb-2">
          <label>Products must match:</label>
          <span className="d-flex align-items-center gap-1">
            <label>All Conditions</label>
            <input
              defaultChecked
              onChange={() => {
                setOrAnd(false);
              }}
              name="allAny"
              type="radio"
            />
          </span>
          <span className="d-flex align-items-center gap-1">
            <label>Any Condition</label>
            <input
              onChange={() => {
                setOrAnd(true);
              }}
              name="allAny"
              type="radio"
            />
          </span>
        </div>
        <div id="divConditions">
          {conditions.map((item, i) => {
            let relationArr =
              conditions[i].variable1 === "Quantity" ||
              conditions[i].variable1 === "Price"
                ? relationObj.int
                : relationObj.str;
            return (
              <div className="d-flex gap-2 my-2" key={item.id}>
                <span className="d-flex gap-2 col-10">
                  <Form.Select
                    size="sm"
                    value={item.variable1}
                    onChange={(e) => onChangeHandler(i, e, "variable1")}
                  >
                    {variable1Array.map((itemInner, i) => {
                      return (
                        <option key={i} value={itemInner}>
                          {itemInner}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Select
                    size="sm"
                    value={item.relation}
                    onChange={(e) => onChangeHandler(i, e, "relation")}
                  >
                    {relationArr.map((itemInner, i) => {
                      return (
                        <option key={i} value={itemInner.value}>
                          {itemInner.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <input
                    className="col-4 border rounded-2 px-2 shorttxt"
                    type={
                      conditions[i].variable1 === "Quantity" ||
                      conditions[i].variable1 === "Price"
                        ? "number"
                        : "text"
                    }
                    onChange={(e) => onChangeHandler(i, e, "variable2")}
                    value={item.variable2}
                  />
                </span>
                {i > 0 && (
                  <Button
                    variant="danger"
                    size="sm"
                    className="btnDelete"
                    onClick={() => deleteCondition(i)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <Button size="sm" className="my-2" onClick={addCondition}>
          Add more..
        </Button>
        <p className="my-2 shorttxt">Current Condition(s) : {result}</p>
      </Card.Body>
    </Card>
  );
}

export default ConditionGenerator;
