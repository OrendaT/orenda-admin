'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserData } from '@/types';

interface TeamBadgeProps {
  teams: UserData['teams'];
}

const TeamBadge: React.FC<TeamBadgeProps> = ({ teams }) => {
  const [open, setOpen] = React.useState(false);

  const teamNames = Object.keys(teams);
  const hasTeams = teamNames.length > 0;

  return (
    <div className="relative inline-block">
      {hasTeams ? (
        <>
          <Button
            variant="active"
            size="sm"
            onClick={() => setOpen(!open)}
            className="rounded-full text-xs px-3 py-1 flex items-center gap-1"
          >
            Team(s)
            {open ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </Button>

          {open && (
            <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="p-2 space-y-2 max-h-64 overflow-y-auto">
                {teamNames.map((team) => (
                  <div key={team} className="space-y-1">
                    <div className="text-xs font-semibold text-gray-700">{team}</div>
                    <div className="flex flex-wrap gap-1">
                      {teams[team].map((role) => (
                        <Badge
                          key={role}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <Badge variant="destructive" className="opacity-80 px-4 py-1 rounded-xl">
          No Team
        </Badge>
      )}
    </div>
  );
};

export default TeamBadge;
