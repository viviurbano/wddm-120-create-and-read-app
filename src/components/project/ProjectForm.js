import { useState, useEffect } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(
      'https://my-json-server.typicode.com/viviurbano/wddm-120-create-and-read-app/categories',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(resp => resp.json())
      .then(data => {
        setCategories(data);
      });
  }, []);

  const submit = e => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Project name"
        name="name"
        placeholder="Enter the project name"
        handleOnChange={handleChange}
        value={project.name}
      />
      <Input
        type="number"
        text="Project budget"
        name="budget"
        placeholder="Enter the total budget"
        handleOnChange={handleChange}
        value={project.budget}
      />
      <Select
        name="category_id"
        text="Select category"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton btnText="Create Project" />
    </form>
  );
}

export default ProjectForm;
