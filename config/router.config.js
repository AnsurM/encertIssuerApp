export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      // { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    authority: ['admin', 'user'],
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/list/participantslist' },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     { path: '/dashboard', redirect: '/dashboard/analysis' },
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      //List of Participants
      {
        path: '/list/participantslist',
        name: 'List of Participants',
        icon: 'ordered-list',
        component: './List/ParticipantList',
      },
      //List of Certificates
      {
        path: '/certificates',
        name: 'Certificates',
        icon: 'table',
        routes: [
          { path: '/certificates', redirect: '/certificates/certificateslist' },
          {
            path: '/certificates/certificateslist',
            name: 'List of Certificates',
            icon: 'ordered-list',
            component: './List/CertificateCardList',
          },
          //Issue Certificate
          {
            path: '/certificates/issueCertificate',
            name: 'Issue Certificate',
            component: './Forms/StepForm',
            icon: 'form',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/certificates/issueCertificate',
                redirect: '/certificates/issueCertificate/form/step-form/info',
              },
              {
                path: '/certificates/issueCertificate/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/certificates/issueCertificate/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/certificates/issueCertificate/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
        ]
      },
      //List of Revoked Certificates
      {
        path: '/list/search/revokedCertificateslist',
        name: 'List of Revoked Certificates',
        icon: 'ordered-list',
        component: './List/RevokedCertificateCardList',
      },
      {
        component: '404',
      },
    ],
  },
];






      //      forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
//      list
      // {  
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/participantslist',
      //       name: 'List of Participants',
      //       icon: 'ordered-list',
      //       component: './List/ParticipantList',
      //     },
      //     {
      //       path: '/list/search/certificateslist',
      //       name: 'List of Certificates',
      //       icon: 'ordered-list',
      //       component: './List/CertificateCardList',
      //     },
      //     {
      //       path: '/list/search/revokedCertificateslist',
      //       name: 'List of Revoked Certificates',
      //       icon: 'ordered-list',
      //       component: './List/RevokedCertificateCardList',
      //     },
      //     {
      //       path: '/list/table-list1',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },          {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //           {
      //             path: '/list/search/applications',
      //             name: 'applications',
      //             component: './List/Applications',
      //           },
      //       ],
      //     },
      //   ],
      // },

      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // list
