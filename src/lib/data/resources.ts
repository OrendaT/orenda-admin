import { Resource } from '@/types';
import {
  LuBook,
  LuFileText,
  LuHandshake,
  LuInfo,
  LuScrollText,
  LuVideo,
} from 'react-icons/lu';
import { PiFolderUser, PiUsersThreeBold } from 'react-icons/pi';

export const resources: Resource[] = [
  {
    id: '/',
    name: 'Policies & Info',
    Icon: LuScrollText({}),
    resources: [
      {
        id: 'policies-info-1',
        name: 'Controlled Substance Statement',
        url: 'https://drive.google.com/file/d/1NthJKYcdwr0quNUwSEXQDa8mAl4y1zhp/view?usp=drive_link',
      },
      {
        id: 'policies-info-2',
        name: 'Instructions: Medical Forms Orenda',
        url: 'https://drive.google.com/file/d/1yrDr0RQsoSDpAz14morso2VZNYk4BRqy/view?usp=drive_link',
      },
      {
        id: 'policies-info-3',
        name: 'Orenda ADHD Policy',
        url: 'https://drive.google.com/file/d/1RQcvS59DAiIRrNqYD35zXgpxIvUqN4fN/view?usp=drive_link',
      },
      {
        id: 'policies-info-4',
        name: 'Orenda Medical Clearance for Psychotropic Medication',
        url: 'https://drive.google.com/file/d/14RryKS_4o2WVNKXhH2og2sYcfrO9Pqh3/view?usp=drive_link',
      },
      {
        id: 'policies-info-5',
        name: 'Orenda Practice Policies',
        url: 'https://docs.google.com/document/d/1evNMFGlmZwmWdaXW8MPSYC-O9TUk6sLP/edit?usp=drive_link&ouid=109542774637430615636&rtpof=true&sd=true',
      },
      {
        id: 'policies-info-6',
        name: 'Updated Policy Forms Letters 2025',
        url: 'https://drive.google.com/file/d/1wocceo4KP-vQW2uAfZNk-zhTpU8aPhfl/view?usp=drive_link',
      },
    ],
  },
  {
    id: '/meet-the-team',
    name: 'Meet the Team',
    Icon: PiUsersThreeBold({}),
    resources: [
      {
        id: 'meet-the-team-1',
        name: 'Meet the Team',
        url: 'https://drive.google.com/file/d/16OwIqLKhaqiTfTOT_QN79ZD2IxVjJT3J/view?usp=drive_link',
      },
      {
        id: 'meet-the-team-2',
        name: 'Admin Schedule',
        url: 'https://drive.google.com/file/d/1O6A3JrCHIlJgarZWRK3M5vPrtjAmhUb-/view?usp=drive_link',
      },
    ],
  },

  {
    id: '/student-folder',
    name: 'Student Folder',
    Icon: PiFolderUser({}),
    resources: [
      {
        id: 'student-folder-1',
        name: 'Orenda PMHNP Clinical Plan',
        url: 'https://docs.google.com/document/d/1EwwhAWAnJHHPI9pZuaLYPhNlSbuCrkPq/edit?usp=drive_link&ouid=109542774637430615636&rtpof=true&sd=true',
      },
      {
        id: 'student-folder-2',
        name: 'Orenda Webside',
        url: 'https://docs.google.com/document/d/1N1Ig3c0NzsBoIjnk9UTEjPe-ViPuDKCb/edit?usp=drive_link&ouid=109542774637430615636&rtpof=true&sd=true',
      },
    ],
  },
  {
    id: '/town-hall-recordings',
    name: 'Town Hall Recordings',
    Icon: LuVideo({}),
    resources: [
      {
        id: 'town-hall-recordings-1',
        name: 'Orenda Town Hall - 2025_02_19 17_50 EST - Recording',
        url: 'https://drive.google.com/file/d/1n0qKY4mbSm3_1uSEnPY0YxPFqu7kNoqm/view?usp=drive_link',
      },
    ],
  },
  {
    id: '/bm',
    title: 'B&M Info',
    name: 'Brick & Mortar Office Info',
    Icon: LuInfo({}),
    resources: [
      {
        id: '/bm/ny-office-info',
        name: 'NY Office Info',
        resources: [
          {
            id: 'ny-office-info-1',
            name: '80 5th 903 Updated Info',
            url: 'https://drive.google.com/file/d/1H2jRW3OWy3IgeQ4qYoPdla_3BBoc9vk0/view?usp=drive_link',
          },
          {
            id: 'ny-office-info-2',
            name: '80 Fifth Ave Office Signup',
            url: 'https://docs.google.com/spreadsheets/d/1O2smhkYDHv18pVdiFqmTvbZoeaahYKe-/edit?usp=drive_link&ouid=109542774637430615636&rtpof=true&sd=true',
          },
        ],
      },
      {
        id: '/bm/boston-office-info',
        name: 'Boston Office Info',
        resources: [
          {
            id: 'boston-office-info-1',
            name: '75 Arlington MA - Office Info',
            url: 'https://drive.google.com/file/d/1Z_ZwuY_2RK9rnP3TrOR4IrZ2J38g6DWV/view?usp=drive_link',
          },
          {
            id: 'boston-office-info-2',
            name: 'Boston Office Patient Template',
            url: 'https://docs.google.com/spreadsheets/d/1KViag-B0LpBl8iQau2rIGQ4CMFv5GZko/edit?usp=drive_link&ouid=109542774637430615636&rtpof=true&sd=true',
          },
        ],
      },
    ],
  },
  {
    id: '/partnership-referrals',
    name: 'Partnership/Referrals',
    Icon: LuHandshake({}),
    resources: [
      {
        id: '/partnership-referrals/charlie-health-virtual-iop',
        name: 'Charlie Health Virtual IOP',
        resources: [
          {
            id: '/description-of-services',
            name: '[Referral-Facing] Description of Services',
            url: 'https://drive.google.com/file/d/1_Ih4Ew7ITj-wuz6rTfdxpI6VaYUuoqGd/view?usp=drive_link',
          },
          {
            id: '/outcomes-one-pager',
            name: '[Referral-Facing] Outcomes One Pager',
            url: 'https://drive.google.com/file/d/1P8Pqai4ZxKE3A6u-iS6ROYuHFwhrW2Re/view?usp=drive_link',
          },
          {
            id: '/ch-sample-schedule',
            name: 'CH Sample Schedule',
            url: 'https://drive.google.com/file/d/1klsjpLRE33BLMv_dBLJ8LqHHzY7037Ce/view?usp=drive_link',
          },
          {
            id: '/client-facing-one-pager-5',
            name: 'Client-Facing One Pager 5',
            url: 'https://drive.google.com/file/d/1sy9gLtdEaUd0e9dj1rYRehDoufncxjWs/view?usp=drive_link',
          },
          {
            id: '/iop-right-for-your-patient',
            name: 'Is IOP Right for Your Patient',
            url: 'https://drive.google.com/file/d/1M5eV2UKZzgPgPOAZytiG7YuVvGV7E4WZ/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/partnership-referrals/moxo-files',
        name: 'MOXO Files',
        resources: [
          {
            id: '/how-to-schedule-a-moxo-test',
            name: 'How to Schedule a Moxo.ai ADHD Test',
            url: 'https://drive.google.com/file/d/1MTkv2AvVo_xpmwEZLSjIBqiNAFvVKH8C/view?usp=drive_link',
          },
          {
            id: '/moxo-measures',
            name: 'MOXO Measures',
            url: 'https://drive.google.com/file/d/12INl-P_98oEpZ2ingojkTiWcJCNJQNQV/view?usp=drive_link',
          },
          {
            id: '/moxo-presentation',
            name: 'Moxo Presentation',
            url: 'https://docs.google.com/presentation/d/1WxrNlIAAhr6QsquGWkF7aHHzkLstbdzC/edit?usp=drive_link&ouid=109542774637430615636&rtpof=true&sd=true',
          },
          {
            id: '/moxo-one',
            name: 'MOXO.1',
            url: 'https://drive.google.com/file/d/1T6yo5ueA_vPJ9Lz3m_0Mp03k9yO3PXr0/view?usp=drive_link',
          },
          {
            id: '/purchasing-moxo-tests',
            name: 'Purchasing MOXO Tests',
            url: 'https://drive.google.com/file/d/11iPBc55jDgDk2XNwy8cInJWJP5ALriiX/view?usp=drive_link',
          },
          {
            id: '/moxo-essentials',
            name: 'Remote Test Scheduler - MOXO Essentials',
            url: 'https://drive.google.com/file/d/1uAqs9-7P-4guHvZdtm9toLi7CQu-VEtO/view?usp=drive_link',
          },
          {
            id: '/how-to-diagnose-adhd',
            name: 'Understanding how to diagnose ADHD and utilize the Moxo.ai-d-CPT as part of a multimodal approach in assessment',
            url: 'https://docs.google.com/document/d/1NfWA74hPhsS_CKbv9HY0Ebz3XMWvgQ3lf9aQZySW570/edit?usp=drive_link',
          },
          {
            id: '/how-to-diagnose-adhd-2',
            name: 'Understanding how to diagnose ADHD and utilize the Moxo.ai-d-CPT as part of a multimodal approach in assessment',
            url: 'https://drive.google.com/file/d/1TC0_21DWXjXGp_AcBzrWfAEG2NyLfrTU/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/partnership-referrals/nocd',
        name: 'NOCD',
        resources: [
          {
            id: '/nocd-101',
            name: 'Copy of NOCD 101 Webinar.pptx',
            url: 'https://drive.google.com/file/d/13IuRZw0txperWkzk7J8HhmiFsydGU8Ow/view?usp=drive_link',
          },
          {
            id: '/nocd-orenda',
            name: 'NOCD x Orenda',
            url: 'https://drive.google.com/file/d/1UBkRZhFh_KzBEKIDsW-DySV_72impPji/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/partnership-referrals/wondermed',
        name: 'Wondermed - At Home Ketamine Therapy',
        title: 'Wondermed',
        resources: [
          {
            name: 'Evidence Based Prescribing Protocol - For Patients',
            url: 'https://drive.google.com/file/d/13GIb5vWF3w3Ol-vyXXIkJejD5ygxSkHw/view?usp=drive_link',
          },
          {
            name: 'Ketamine in OCD',
            url: 'https://drive.google.com/file/d/1xeoXEwv63fc1Fir2EST264Uf07SCUkGj/view?usp=drive_link',
          },
          {
            name: 'Ketamine Therapy Prime the Brain and Cement the Change',
            url: 'https://drive.google.com/file/d/1b3-8lyqzadV2-TXDVV3pNhgpXsYD2ols/view?usp=drive_link',
          },
          {
            name: 'Orenda Ketamine Consent',
            url: 'https://drive.google.com/file/d/1w7uHAi5njtphCTKvphqHIck1aD4p5jXy/view?usp=drive_link',
          },
          {
            name: "Orenda's Ketamine Program Educational Video",
            url: 'https://drive.google.com/file/d/1b3gPiEREthVbnf28kUVTP3Nggq47f2uq/view?usp=drive_link',
          },
          {
            name: 'Prescribing Protocol for Clinicians (proprietary, do not share)',
            url: 'https://drive.google.com/file/d/1mrKgsDgdawUtZfqDqJ3r2xG4V3cmRPpr/view?usp=drive_link',
          },
          {
            name: 'Study TRD treatments',
            url: 'https://drive.google.com/file/d/1Y6xmYJ84QkjhA0_Evv9Shdd30UVezuDM/view?usp=drive_link',
          },
        ],
      },
    ],
  },
  {
    id: '/therapy-worksheets',
    name: 'Therapy Worksheets',
    Icon: LuFileText({}),
    resources: [
      {
        id: '/therapy-worksheets/dbt-group',
        name: 'DBT Group (MSI-BPD)',
        resources: [
          {
            name: 'Maclean Screen for Borderline Personality Disorder',
            url: 'https://drive.google.com/file/d/1jwUn-L--_8r8H6xpfWp2JfOdGlui7QaJ/view?usp=drive_link',
          },
          {
            name: 'Anxiety Journal',
            url: 'https://drive.google.com/file/d/18hJhXvn4b1S_4ycsi4b-Po3Qa_V7sMhn/view?usp=drive_link',
          },
          {
            name: 'Boundary Cards',
            url: 'https://drive.google.com/file/d/1WN-ZyRirF5BgjZqeHd607JDTrmIzQrzl/view?usp=drive_link',
          },
          {
            name: 'CBT for Anxiety',
            url: 'https://drive.google.com/file/d/1yPoZA6AVytPskW5Yn5ZMYupLKRJmodkx/view?usp=drive_link',
          },
          {
            name: 'Challenging Cognitive Distortions',
            url: 'https://drive.google.com/file/d/1rwrxPPPJ6muyyogjiP508RzmVNHGuuJm/view?usp=drive_link',
          },
          {
            name: 'Coping with Anxiety',
            url: 'https://drive.google.com/file/d/17MzbRvL85ozXqCPwSIb_Za04rnNSmGG6/view?usp=drive_link',
          },
          {
            name: 'What is DBT?',
            url: 'https://drive.google.com/file/d/1cfHL44oktJq0BmBNA2Pr4grq7H-IpysX/view?usp=drive_link',
          },
          {
            name: 'DBT Boundaries',
            url: 'https://drive.google.com/file/d/1fKDvusSbqoVNyMPFv6UXidJyOs48PCtd/view?usp=drive_link',
          },
          {
            name: 'DBT Cheat Sheet',
            url: 'https://drive.google.com/file/d/1D-5kj1EqnYBDOiKPun0b9qreBOOezeCs/view?usp=drive_link',
          },
          {
            name: 'DBT Coping Statements Cards',
            url: 'https://drive.google.com/file/d/1_uFzVdVtTVpvy4YRTb8M8ZZesxJEx1Ox/view?usp=drive_link',
          },
          {
            name: 'DBT EBP Article',
            url: 'https://drive.google.com/file/d/1hpCdWJuJqb38U2kwdFa6RqgRBTti1vvA/view?usp=drive_link',
          },
          {
            name: 'DBT House',
            url: 'https://drive.google.com/file/d/1jSLclkFD84cl5c2I8xVQY1IMCDF884BH/view?usp=drive_link',
          },
          {
            name: 'DBT Week 1 homework',
            url: 'https://drive.google.com/file/d/1VTBzWOjmUde3Fw_yO8HA5wwCy3Z7JuCC/view?usp=drive_link',
          },
          {
            name: 'DBT HW Week 2',
            url: 'https://drive.google.com/file/d/1hl6y4CkJLn4zBMmt6wvc2pZZ6Lzm0wkd/view?usp=drive_link',
          },
          {
            name: 'DBT HW Week 3',
            url: 'https://drive.google.com/file/d/1oJac6NxyqJZwJI3RkbsS1Xh7H1xzoPhh/view?usp=drive_link',
          },
          {
            name: 'DBT Week 4',
            url: 'https://drive.google.com/file/d/1sZWxLUewVwPw0-BMfrtpv3siuI9WLsTt/view?usp=drive_link',
          },
          {
            name: 'DBT HW Week 4',
            url: 'https://drive.google.com/file/d/1C4Wh7NmQsXn9qNhLucOU9VYJCbQXFrmj/view?usp=drive_link',
          },
          {
            name: 'DBT Week 5',
            url: 'https://drive.google.com/file/d/1A14rX_7UnAQ3gTJ3JnxfY4BRuFMbETOp/view?usp=drive_link',
          },
          {
            name: 'DBT Week 5 added pages',
            url: 'https://drive.google.com/file/d/1wlZ_rWtUvvtrgcvQEyMEMtDyITisX8w6/view?usp=drive_link',
          },
          {
            name: 'DBT Week 6',
            url: 'https://drive.google.com/file/d/14LJJpzgCgmgxssyCgxpba13eK53Fscg8/view?usp=drive_link',
          },
          {
            name: 'DBT Week 6 handouts',
            url: 'https://drive.google.com/file/d/1SCrnyw_qfRtHxzkko1orDTiXLN82X3wM/view?usp=drive_link',
          },
          {
            name: 'DBT Week 6 homework',
            url: 'https://drive.google.com/file/d/1qEY-9UN61-vClRQmMJKVpMg1WblQVMLX/view?usp=drive_link',
          },
          {
            name: 'DBT Week 7',
            url: 'https://drive.google.com/file/d/1aWNWsGk5t6EspJZSRX-uj5nJqz-NtctR/view?usp=drive_link',
          },
          {
            name: 'DBT Week 8 - ER',
            url: 'https://drive.google.com/file/d/1if_hgHxEyumUAMfDDl7tgDoLW7T4oRxl/view?usp=drive_link',
          },
          {
            name: 'DBT Week 9',
            url: 'https://drive.google.com/file/d/1PXvUCjjiM11fGZGmOl1UIQZdPS0BGTX1/view?usp=drive_link',
          },
          {
            name: 'DBT Week 10 Handouts and Worksheets',
            url: 'https://drive.google.com/file/d/1noEvkUZz-94yhnbVUCyDdBxIZPnpTlJS/view?usp=drive_link',
          },
          {
            name: 'DBT Week 11',
            url: 'https://drive.google.com/file/d/1bJjkncpivRPDxfWM-W0xif5WE58wMu_q/view?usp=drive_link',
          },
          {
            name: 'DBT Week 12',
            url: 'https://drive.google.com/file/d/1L985Efq6vQVrCjoLSGMNuMJn-Jb7i5Zh/view?usp=drive_link',
          },
          {
            name: 'DBT Orientation Handout',
            url: 'https://drive.google.com/file/d/1gCd2W_UviHEjOjJQH8LW64lONUhdZM3g/view?usp=drive_link',
          },
          {
            name: 'DBT Skills Journal',
            url: 'https://drive.google.com/file/d/1Hc1EYx_dsch99z0QhQF-JBoTSrVKr9sE/view?usp=drive_link',
          },
          {
            name: 'DBT Window of Tolerance',
            url: 'https://drive.google.com/file/d/1gbjVm1qrv2_H-8FNiUVG3Pup3zvfQhNg/view?usp=drive_link',
          },
          {
            name: 'DBT Worksheets',
            url: 'https://drive.google.com/file/d/1EtUk5PXOyuqASfB8XDvfDj04FXdFbO9l/view?usp=drive_link',
          },
          {
            name: 'Developing a Safety Plan',
            url: 'https://drive.google.com/file/d/1HBD8ZSV3iF12dpNKx5mEJTyvXTfFLesL/view?usp=drive_link',
          },
          {
            name: 'Gratitude',
            url: 'https://drive.google.com/file/d/1tMaJbyeW0tbVY0ulON5VZngdTjpeC65v/view?usp=drive_link',
          },
          {
            name: 'Healing and preventing ACEs',
            url: 'https://drive.google.com/file/d/1-Sa5wIA_sdoNLnyHKAmogdG7_BdbPYOd/view?usp=drive_link',
          },
          {
            name: 'Inner Critic',
            url: 'https://drive.google.com/file/d/1Loqs2aI_6lRSnmkdJ3BzZSRADPt5m6v7/view?usp=drive_link',
          },
          {
            name: 'My Life Story - Tree of Life',
            url: 'https://drive.google.com/file/d/1ZpZvxofVyWEmwFDpGbnaGp0dwPhHR3TR/view?usp=drive_link',
          },
          {
            name: 'My Personal Boundaries',
            url: 'https://drive.google.com/file/d/1UUsgP6xBBK_n4HrN0kKJ7Gamk0URsNEs/view?usp=drive_link',
          },
          {
            name: 'Navigating healthy relationships',
            url: 'https://drive.google.com/file/d/1EMR0crPbw7SrwjPqH3P7VxWF2UzyTnJs/view?usp=drive_link',
          },
          {
            name: 'Radical Acceptance worksheets',
            url: 'https://drive.google.com/file/d/1vSNBSjaUkExX0bBm-aXUqB82fNrINqYt/view?usp=drive_link',
          },
          {
            name: 'Self Care cards',
            url: 'https://drive.google.com/file/d/1EdWd0mR6M5RaxZuyIjFSaCszmJ-SFQbT/view?usp=drive_link',
          },
          {
            name: 'SWG1017 DBT MEGA BUNDLE',
            url: 'https://drive.google.com/file/d/1KxG67PzwDk9h-KjOeWYeCxC8DY9OEtLH/view?usp=drive_link',
          },
          {
            name: 'Values and Priorities',
            url: 'https://drive.google.com/file/d/1lXKRH2S-_kZcdnwxYPTh-_kSqCIxrh4s/view?usp=drive_link',
          },
          {
            name: 'Vulnerability factors and self care',
            url: 'https://drive.google.com/file/d/1cHTKAFANIlfgMeLNHZjFjDOmCImRUtXN/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/therapy-worksheets/swg-bundle',
        name: 'SWG Trauma Bundle',
        resources: [
          {
            name: 'Window of Tolerance',
            url: 'https://drive.google.com/file/d/1nn_17JV9sLZpuHCq_hVENRlVVV-OZbgO/view?usp=drive_link',
          },
          {
            name: 'Tree of Life - My Life Story',
            url: 'https://drive.google.com/file/d/1r31OThj178TQuHu7-4aQ5Zc7phg4J_ch/view?usp=drive_link',
          },
          {
            name: 'Trauma Worksheets',
            url: 'https://drive.google.com/file/d/1yzsiKuXdVGw3TL51stO5L0fBoUbd1h76/view?usp=drive_link',
          },
          {
            name: 'Safety Plan',
            url: 'https://drive.google.com/file/d/1vl1-fqRqOXbgKFfrJrZnP8OQiCIChIox/view?usp=drive_link',
          },
          {
            name: 'PTSD Cards',
            url: 'https://drive.google.com/file/d/1DAhZp2muXhedKs9eaBM0SR45J39v6AEY/view?usp=drive_link',
          },
          {
            name: 'Fight or Flight Response',
            url: 'https://drive.google.com/file/d/1lLUyJjBWr1P5qLClw1QFdmerfxl57rUG/view?usp=drive_link',
          },
          {
            name: 'Cognitive Distortions Worksheets',
            url: 'https://drive.google.com/file/d/1F-OVJbZrKLwbEj1gRJ6iRW_onR4FZoX3/view?usp=drive_link',
          },
          {
            name: 'Anxiety Coping Skills Cards',
            url: 'https://drive.google.com/file/d/1HYMFeZr7S09_feT_O7LX3jpWrkctpPjH/view?usp=drive_link',
          },
          {
            name: 'Adverse Childhood Experiences',
            url: 'https://drive.google.com/file/d/1d9639V9Q4cco0q0oTnLDn65WdJvYk7rM/view?usp=drive_link',
          },
          {
            name: 'US Letter Self Esteem',
            url: 'https://drive.google.com/file/d/1rWgUti6gBrr1F0Ip_qn7TDfPqwvStiMO/view?usp=drive_link',
          },
          {
            name: 'US Letter Self Care Wheel',
            url: 'https://drive.google.com/file/d/11Mt9hgi4vt_-m6sTyxczrLl4NnRgrbrr/view?usp=drive_link',
          },
          {
            name: 'US Letter Healthy Relationships 7.4.23',
            url: 'https://drive.google.com/file/d/1jtGwPDPVUrwUXBDWcuug4FNPeZD2dWiz/view?usp=drive_link',
          },
          {
            name: 'US Letter Gratitude Book',
            url: 'https://drive.google.com/file/d/18fT_aZY2a-V06rv9dJCMqI8_uUTf5ChP/view?usp=drive_link',
          },
          {
            name: 'US Letter Boundaries Worksheets',
            url: 'https://drive.google.com/file/d/14de9mHhYJxr0Wd3eZjp7KjKs1ELFEpdd/view?usp=drive_link',
          },
          {
            name: 'US Letter ANXIETY',
            url: 'https://drive.google.com/file/d/1obPCFmkKlYkVEKyhlBDMU6z9yJJaMQJp/view?usp=drive_link',
          },
          {
            name: 'US Letter Anxiety Journal',
            url: 'https://drive.google.com/file/d/1WdC6JtgihIe_lXgVGYza__O34zN77D4v/view?usp=drive_link',
          },
          {
            name: 'Inner Critic Workbook (PDF)',
            url: 'https://drive.google.com/file/d/1QPfdhCD2qMIrsS5qt31ZW71zSXPqnBVr/view?usp=drive_link',
          },
          {
            name: 'Inner Critic Workbook (Google Doc)',
            url: 'https://docs.google.com/document/d/1uHIDugp6b6967c1WM_bWeJIIIG_FoytLquQls9DCDt0/edit?usp=drive_link',
          },
          {
            name: 'DIVA 2.0 Assessment',
            url: 'https://drive.google.com/file/d/15eS4YJFAzgfM8WlrdpibS_mHYSfud7U3/view?usp=drive_link',
          },
          {
            name: 'Barkley Deficits in Executive Functioning Scale',
            url: 'https://docs.google.com/document/d/1KVbZU8KzpOokEoNcGE4vLGggsqL1p3W6/edit?usp=drive_link&ouid=109542774637430615636&rtpof=true&sd=true',
          },
          {
            name: 'Acceptance Therapy (PDF)',
            url: 'https://drive.google.com/file/d/1Ypg5ti7Tu228ApGEu8m-FuqjuCew9teF/view?usp=drive_link',
          },
          {
            name: 'Acceptance Therapy (Google Doc)',
            url: 'https://docs.google.com/document/d/17ZDgTNhLCHrAC8g-TGoCWIk7FiAWrG7KUoKqi410o-c/edit?usp=drive_link',
          },
          {
            name: '9 x 11 Self Care Cards',
            url: 'https://drive.google.com/file/d/1XiV7xr7lxIEACXKiUFT540zSvF4Mecod/view?usp=drive_link',
          },
        ],
      },
    ],
  },
  {
    id: '/training-resources',
    name: 'Training Resources',
    Icon: LuBook({}),
    resources: [
      {
        id: '/training-resources/billing-and-documentation',
        name: 'Billing and Documentation',
        resources: [
          {
            name: 'Down-time Simple Practice Note',
            url: 'https://docs.google.com/document/d/12qDzxfaGP4gnLqmvw2F27Y7EM54U7dgr/edit?usp=drive_link',
          },
          {
            name: 'Billing Presentation (doc)',
            url: 'https://docs.google.com/document/d/1t7ID__V2LB4opXjAqGeAwz2xiokbRgw4j5ykp6G5MGY/edit?usp=drive_link',
          },
          {
            name: 'Billing Presentation (pdf)',
            url: 'https://drive.google.com/file/d/1SLuLaT3VMFRFhjrzvPQqUHHx44FXNhZz/view?usp=drive_link',
          },
          {
            name: 'No-Show Attestation Creation',
            url: 'https://drive.google.com/file/d/1u2keKcyMzzNE5Pzkwwzgwuw-O6mjIFSj/view?usp=drive_link',
          },
          {
            name: 'Offer Therapy-Only Sessions',
            url: 'https://drive.google.com/file/d/1yGh8y9NWqHrzT6Ho67mCf5R58JTDaGp9/view?usp=drive_link',
          },
          {
            name: 'Training Cheat Sheet',
            url: 'https://docs.google.com/document/d/1-s2wCtjQ8CrSwxhmRKWjZyp33hEot4cK/edit?usp=drive_link',
          },
        ],
      },
      {
        id: '/training-resources/dx-script-training-videos',
        name: 'DxScript Training Videos',
        resources: [
          {
            name: 'Rx Requires PA & Cost Info',
            url: 'https://drive.google.com/file/d/12SZF0vn7hoIdLBIh_R_EDophezGKulZI/view?usp=drive_link',
          },
          {
            name: 'Understanding Medication Hx',
            url: 'https://drive.google.com/file/d/12ZvGAPCcItHHqCS6ZyNDkhTqnBVQuGUy/view?usp=drive_link',
          },
          {
            name: 'Rx Errors',
            url: 'https://drive.google.com/file/d/12HqYaW6d8OrO9aJV2rF8E1f9P3m7dZhQ/view?usp=drive_link',
          },
          {
            name: 'Login in DxScript',
            url: 'https://drive.google.com/file/d/12OR7cfbFYoc1X_ektyR3UUBqvcD3NKT8/view?usp=drive_link',
          },
          {
            name: 'How to Write a Script',
            url: 'https://drive.google.com/file/d/12Oi-kY6Khv93e935iwM0UaNvKBzPPJMz/view?usp=drive_link',
          },
          {
            name: 'How to See the Patient Profile',
            url: 'https://drive.google.com/file/d/12Le5Tk2W_lh23d_KOu_ThsAG72hzMFwR/view?usp=drive_link',
          },
          {
            name: 'How to Cancel a Prescription',
            url: 'https://drive.google.com/file/d/12buWzfcgzrzig8sj6BB0pp9hX5DfE6Ej/view?usp=drive_link',
          },
          {
            name: 'Add/Change Pharmacy',
            url: 'https://drive.google.com/file/d/12GIDk7FEARfTHYA0LuJtzHltWD021WJd/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/training-resources/massachusetts-licensing',
        name: 'Massachusetts Licensing',
        resources: [
          {
            name: 'Section 4 Knowledge Check Certificate',
            url: 'https://drive.google.com/file/d/1Q5sqbaVH0_25Smms7NwzvmcqbX9P6OXe/view?usp=drive_link',
          },
          {
            name: 'Licensing PPT Presentation',
            url: 'https://drive.google.com/file/d/18lVzO4JwE-rMoZm4i7CTQ3Srr1o03ou5/view?usp=drive_link',
          },
          {
            name: 'CORI Acknowledgment Form',
            url: 'https://drive.google.com/file/d/1TGZQUp6eP0oyvW4JPK3SJAteSRUBwYsc/view?usp=drive_link',
          },
          {
            name: 'COG Out-of-State Program Completion',
            url: 'https://drive.google.com/file/d/1iGt3RRR5EsHkyky0Y6KwmPEwuvWX7csM/view?usp=drive_link',
          },
          {
            name: 'CPS Background Record Request Form',
            url: 'https://drive.google.com/file/d/1yX6mssg6lEU-ZoSZ6iRsdGPhfIlkWsJ0/view?usp=drive_link',
          },
          {
            name: 'Applying for RN License in MA',
            url: 'https://drive.google.com/file/d/1YV0CFXqoUbj-wPJVWprK2XniKq1lpo7r/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/training-resources/provider-rn-training',
        name: 'Provider-RN Training',
        resources: [
          {
            name: 'Provider-RN Team Training 1',
            url: 'https://drive.google.com/file/d/12EVotkCvkzyzp-ysI9I4dG4sv5brhO0Q/view?usp=drive_link',
          },
          {
            name: 'Provider RN Training',
            url: 'https://drive.google.com/file/d/11tbxbG7mOY7X87VHSToNNIC4Mt0dA_9b/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/training-resources/quest-lab-training',
        name: 'Quest Lab Training',
        resources: [
          {
            name: 'Quest Lab Training',
            url: 'https://drive.google.com/file/d/12e0IUHg1EsTp9beQNs-jDVCjIqWPWtSX/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/training-resources/slack-videos',
        name: 'Slack Vidoes',
        resources: [
          {
            name: 'Phone Slack Notifications',
            url: 'https://drive.google.com/file/d/1mWIQvdXHPItr875u3yzA5x6h7VGHJs_S/view?usp=drive_link',
          },
          {
            name: 'Slack Tabs',
            url: 'https://drive.google.com/file/d/1IFKaIZsVyw_wkG7VGCH5BDpju5JEzBRL/view?usp=drive_link',
          },
          {
            name: 'Managing Slack',
            url: 'https://drive.google.com/file/d/14WfF4iQxnOPlLJ9DIIl8_BQldGu-zJ54/view?usp=drive_link',
          },
          {
            name: 'Orenda Slack',
            url: 'https://drive.google.com/file/d/1kYMemK8Tr3gI5Iw94nW9aCUzf76IsP_u/view?usp=drive_link',
          },
        ],
      },
      {
        id: '/training-resources/supervision-flyers',
        name: 'Supervision Flyers',
        resources: [
          {
            name: 'Supervision with MDs + Session Links',
            url: 'https://drive.google.com/file/d/1-VncUazEqQe20LvqHPUPEyYwdjpFKdEZ/view?usp=drive_link',
          },
          {
            name: 'Supervision Group for New-Graduate NP',
            url: 'https://drive.google.com/file/d/1q3akHh9i7g8829yZpu-4BEnmFa8Z_bu9/view?usp=drive_link',
          },
          {
            name: 'New Provider Training with Shelley',
            url: 'https://drive.google.com/file/d/1_LaCX1Wnl1TQ7ych2UNPwSPf3fjWgHOi/view?usp=drive_link',
          },
          {
            name: 'Offer Night Spots',
            url: 'https://drive.google.com/file/d/1-Y7dEvEmgvxW3PM4P7ii4flKPysN72Xp/view?usp=drive_link',
          },
        ],
      },
    ],
  },
];
