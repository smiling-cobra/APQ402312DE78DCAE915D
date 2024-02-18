import useSWR from 'swr';
import Select, { SingleValue } from 'react-select';
import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { baseFetcher } from '../services/BaseFetcher';
import { BaseTable } from '../components/Table/Table';

interface SelectOptions {
    value: Organization;
    label: string
}

interface Organization {
    [key: string]: string;
    id: string;
    name: string;
    login: string;
    repos_url: string;
}

interface OrganizationRepo {
    name: string;
    open_issues: string;
    stargazers_count: number;
}

export const Main = () => {
    const [query, setQuery] = useState('');
    const [selectedOrg, setSelectedOrg] = useState<Organization>();

    const { control, formState: { errors } } = useForm({
        defaultValues: {
            organisation: '',
            repository: ''
        }
    });

    console.info('errors', errors);

    const { data: organizations, error: orgErrors } = useSWR(
        query ? `https://api.github.com/search/users?q=${query}+type:org` : null,
        baseFetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
          }
    );

    const { data: repositories, error: reposErrors, isLoading: isReposLoading } = useSWR(
        selectedOrg? selectedOrg?.repos_url : null,
        baseFetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    console.info('reposErrors', reposErrors);

    const organizationRepos: OrganizationRepo[] = useMemo(() => {
        if (!repositories) return [];
        // TODO: Filtering logic
        return repositories;
    }, [repositories]);

    console.log('organizationRepos', organizationRepos);

    const selectOptions: SelectOptions[] = useMemo(() => {
        if (!organizations?.items?.length) return [];

        return organizations.items.map((org: Organization) => ({
            value: org,
            label: org?.login ?? 'Unknown organization'
        }));
    }, [organizations]);

    const handleOnOrganizationChange = (selectedOption?: string) => {
        setQuery(selectedOption ?? '');
    };

    console.info('selectedOrg', selectedOrg);

    return (
        <div className="main-container">
            <form>
                {orgErrors && orgErrors?.message && <span>{orgErrors.message}</span>}
                <Controller
                    name="organisation"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            placeholder="Start typing..."
                            options={selectOptions}
                            onInputChange={handleOnOrganizationChange}
                            onChange={(option: SingleValue<SelectOptions>) => {
                                setSelectedOrg(option?.value);
                                field.onChange(option?.value);
                            }}
                        />
                    )}
                />
                {isReposLoading ? (<span>Loading...</span>) : Object.values(organizationRepos).length ? (
                    <div>
                        <div>
                            <Controller
                                name="repository"
                                defaultValue=""
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Enter repository name..."
                                        onChange={e => field.onChange(e.target.value)}
                                    />
                                )}
                            />
                        </div>
                        <BaseTable repositories={organizationRepos} />
                        {organizationRepos.map(({ name, open_issues, stargazers_count }) => {
                            return (
                                <div>
                                    <div>
                                        <div>
                                            <span>{name}</span>
                                            <span>{open_issues}</span>
                                            <span>{stargazers_count}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : null}
            </form>
        </div>
    )
};