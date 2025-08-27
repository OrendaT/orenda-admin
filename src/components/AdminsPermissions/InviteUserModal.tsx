'use client';

import React, { useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { InviteUserPayload, Role, TeamRole } from '@/types/user';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useUsers } from '@/hooks/useUsers';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// Updated teams and role options
const ALL_TEAMS = [
  'Billing',
  'Clinical',
  'Comms',
  'Credentialling',
  'Doxy',
  'Intake',
  'Prior Auths',
];

const TEAM_ROLES: TeamRole[] = ['Admin', 'Member'];
const ROLE_OPTIONS: Role[] = ['Admin', 'Manager', 'Provider'];

// Utility to generate a password
function generatePassword(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$_';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { inviteUser } = useUsers();

  const methods = useForm<InviteUserPayload>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      roles: [],
      teams: {},
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Auto-generate password when modal opens if none exists
  useEffect(() => {
    if (isOpen && !watch('password')) {
      setValue('password', generatePassword());
    }
  }, [isOpen]);

  const onSubmit = async (data: InviteUserPayload) => {
    try {
      await inviteUser(data);
      reset();
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error('Invite failed', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-lg font-semibold mb-4">
          Invite New User
        </DialogTitle>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register('first_name')} placeholder="First Name" />
            <Input {...register('last_name')} placeholder="Last Name" />
            <Input {...register('email')} placeholder="Email" type="email" />
            <Input {...register('password')} placeholder="Password" type="text" readOnly />

            {/* Role Assignment */}
            <div>
              <label className="block mb-2 text-sm font-medium">Assign Roles</label>
              <div className="flex gap-4 flex-wrap">
                {ROLE_OPTIONS.map((role) => (
                  <label key={role} className="inline-flex items-center gap-1 text-sm">
                    <Checkbox
                      checked={watch('roles')?.includes(role)}
                      onCheckedChange={(checked) => {
                        const currentRoles = watch('roles') || [];
                        const updated = checked
                          ? [...currentRoles, role]
                          : currentRoles.filter((r) => r !== role);
                        setValue('roles', updated as Role[]);
                      }}
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>

            {/* Team Assignment */}
            <div>
              <label className="block mb-2 text-sm font-medium">Assign Teams</label>
              <div className="space-y-4">
                {ALL_TEAMS.map((team) => (
                  <div key={team} className="p-2 border rounded">
                    <div className="font-semibold">{team}</div>
                    <div className="flex gap-4 mt-1">
                      {TEAM_ROLES.map((role) => (
                        <Controller
                          key={`${team}-${role}`}
                          name="teams"
                          control={control}
                          render={({ field }) => {
                            const teamRoles = field.value?.[team] || [];
                            const isChecked = teamRoles.includes(role);

                            return (
                              <label className="inline-flex items-center gap-1 text-sm">
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    const updatedRoles = checked
                                      ? [...teamRoles, role]
                                      : teamRoles.filter((r) => r !== role);

                                    field.onChange({
                                      ...field.value,
                                      [team]: updatedRoles,
                                    });
                                  }}
                                />
                                {role}
                              </label>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Inviting...' : 'Invite'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserModal;
