import { gql } from "@apollo/client";

// Get all tasks
export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      completed
      createdAt
    }
  }
`;

// Create new task
export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      completed
      createdAt
    }
  }
`;

// Update task
export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      completed
      createdAt
    }
  }
`;

// Delete task
export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
