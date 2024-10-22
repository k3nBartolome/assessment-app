import { createRouter, createWebHistory } from 'vue-router';
import AssessmentLayout from '@/layouts/AssessmentPage.vue';
import GenInstruction from '@/components/GeneralInstruction.vue';
import Part1Instruction from '@/components/Part1Instruction.vue';
import Question1 from '@/components/Part1Question1.vue';
import Question2 from '@/components/Part1Question2.vue';
import Part2Instruction from '@/components/Part2Instruction.vue';
import Question3 from '@/components/Part2Question1.vue';
import Part3Instruction from '@/components/Part3Instruction.vue';
import Question4 from '@/components/Part3Question1.vue';

const routes = [
  {
    path: '/assessment',
    component: AssessmentLayout,
    children: [
      { path: '', component: () => import('@/components/RegisterPage.vue') },
      { path: 'gen-instruction', component: GenInstruction },
      {
        path: 'part1-instruction',
        component: Part1Instruction,
        beforeEnter: (to, from, next) => {
          const completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];
          if (completedSteps.includes('/assessment/gen-instruction')) {
            next();
          } else {
            next('/assessment/gen-instruction');
          }
        }
      },
      {
        path: 'question1',
        component: Question1,
        beforeEnter: (to, from, next) => {
          const completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];
          if (completedSteps.includes('/assessment/part1-instruction')) {
            next();
          } else {
            next('/assessment/part1-instruction');
          }
        }
      },
      {
        path: 'question2',
        component: Question2,
        beforeEnter: (to, from, next) => {
          const completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];
          if (completedSteps.includes('/assessment/question1')) {
            next();
          } else {
            next('/assessment/question1');
          }
        }
      },
      {
        path: 'part2-instruction',
        component: Part2Instruction,
        beforeEnter: (to, from, next) => {
          const completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];
          if (completedSteps.includes('/assessment/question2')) {
            next();
          } else {
            next('/assessment/question2');
          }
        }
      },
      {
        path: 'question3',
        component: Question3,
        beforeEnter: (to, from, next) => {
          const completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];
          if (completedSteps.includes('/assessment/part2-instruction')) {
            next();
          } else {
            next('/assessment/part2-instruction');
          }
        }
      },
      {
        path: 'part3-instruction',
        component: Part3Instruction,
        beforeEnter: (to, from, next) => {
          const completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];
          if (completedSteps.includes('/assessment/question3')) {
            next();
          } else {
            next('/assessment/question3');
          }
        }
      },
      {
        path: 'question4',
        component: Question4,
        beforeEnter: (to, from, next) => {
          const completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];
          if (completedSteps.includes('/assessment/part3-instruction')) {
            next();
          } else {
            next('/assessment/part3-instruction');
          }
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
