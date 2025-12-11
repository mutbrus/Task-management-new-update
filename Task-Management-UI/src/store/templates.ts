import { defineStore } from 'pinia'
import type { Task } from './tasks'

export interface TaskTemplate {
  id: string
  name: string
  description: string
  icon: string
  task: Partial<Task>
}

export const useTemplateStore = defineStore('templates', () => {
  const templates: TaskTemplate[] = [
    {
      id: '1',
      name: 'Bug Report',
      description: 'Template for reporting bugs',
      icon: '🐛',
      task: {
        title: 'Bug: ',
        description: '**Steps to Reproduce:**\n1. \n2. \n3. \n\n**Expected Behavior:**\n\n**Actual Behavior:**\n\n**Environment:**\n- Browser: \n- OS: ',
        priority: 'high',
        status: 'To Do',
        tags: ['bug', 'needs-triage'],
        subtasks: [
          { title: 'Reproduce the bug', completed: false },
          { title: 'Document steps', completed: false },
          { title: 'Assign to developer', completed: false },
        ],
      },
    },
    {
      id: '2',
      name: 'Feature Request',
      description: 'Template for new features',
      icon: '✨',
      task: {
        title: 'Feature: ',
        description: '**Description:**\n\n**User Story:**\nAs a [user type], I want [goal] so that [benefit].\n\n**Acceptance Criteria:**\n- [ ] \n- [ ] \n- [ ] ',
        priority: 'medium',
        status: 'To Do',
        tags: ['feature', 'enhancement'],
        subtasks: [
          { title: 'Design mockups', completed: false },
          { title: 'Get approval', completed: false },
          { title: 'Implement feature', completed: false },
          { title: 'Write tests', completed: false },
          { title: 'Update documentation', completed: false },
        ],
      },
    },
    {
      id: '3',
      name: 'Code Review',
      description: 'Template for code review tasks',
      icon: '👀',
      task: {
        title: 'Review PR: ',
        description: '**PR Link:**\n\n**Changes:**\n\n**Review Checklist:**\n- [ ] Code follows style guide\n- [ ] Tests are included\n- [ ] Documentation is updated\n- [ ] No breaking changes',
        priority: 'medium',
        status: 'To Do',
        tags: ['review', 'code'],
        subtasks: [
          { title: 'Review code changes', completed: false },
          { title: 'Check tests', completed: false },
          { title: 'Test locally', completed: false },
          { title: 'Approve or request changes', completed: false },
        ],
      },
    },
    {
      id: '4',
      name: 'Meeting Notes',
      description: 'Template for meeting follow-ups',
      icon: '📝',
      task: {
        title: 'Meeting: ',
        description: '**Date:**\n**Attendees:**\n\n**Agenda:**\n1. \n2. \n3. \n\n**Action Items:**\n- [ ] \n- [ ] \n\n**Notes:**',
        priority: 'low',
        status: 'To Do',
        tags: ['meeting', 'notes'],
        subtasks: [],
      },
    },
    {
      id: '5',
      name: 'Research Task',
      description: 'Template for research tasks',
      icon: '🔍',
      task: {
        title: 'Research: ',
        description: '**Research Question:**\n\n**Findings:**\n\n**Sources:**\n- \n- \n\n**Conclusion:**',
        priority: 'medium',
        status: 'To Do',
        tags: ['research'],
        subtasks: [
          { title: 'Gather information', completed: false },
          { title: 'Analyze findings', completed: false },
          { title: 'Document results', completed: false },
        ],
      },
    },
  ]

  function getTemplate(id: string): TaskTemplate | undefined {
    return templates.find(t => t.id === id)
  }

  function getAllTemplates(): TaskTemplate[] {
    return templates
  }

  return {
    templates,
    getTemplate,
    getAllTemplates,
  }
})

