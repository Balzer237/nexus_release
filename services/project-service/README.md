# Project Service

The **Project Service** is responsible for managing projects created by users inside a **Universe**.  
A project represents a concrete initiative (idea, product, challenge, etc.) and is structured into **phases**.

---

## Project Creation

When a project is created, it follows a strict lifecycle to ensure quality and control.

### Default State: Draft

- Every newly created project is **automatically set to `DRAFT` status**.
- In this state:
  - The project is **not visible** to other users.
  - The project **cannot be published immediately**.
  - Only the project owner (and authorized roles) can edit it.

This design enforces a preparation phase before public exposure.

### Draft Constraints

While a project is in `DRAFT` mode:

**The user can:**
- Edit the project’s basic information (title, description, goals, etc.)
- Create and organize project phases

**The user cannot:**
- Publish the project
- Accept participants
- Make the project discoverable

> A project must meet all required conditions before it becomes eligible for publication.

### Publishing Rules

A project can only be published after:

- All mandatory fields are completed
- At least one valid phase is defined

Once published:

- The project state changes from `DRAFT` → `PUBLISHED`
- The project becomes visible within its Universe
- Users can request to participate (depending on project settings)

---

## Lifecycle Diagram

```mermaid
stateDiagram
    [*] --> DRAFT
    DRAFT --> PUBLISHED : meets conditions
    PUBLISHED --> ARCHIVED : project ended
