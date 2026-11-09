// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START dialogflow_v3_environments_lookup_environment_history]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// lookupEnvironmentHistory retrieves the history of the specified Dialogflow CX environment.
func lookupEnvironmentHistory(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, environmentID string) error {
	var opts []option.ClientOption
	if locationID != "global" && locationID != "" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := dialogflow.NewEnvironmentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewEnvironmentsClient failed: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/environments/%s", projectID, locationID, agentID, environmentID)

	req := &cxpb.LookupEnvironmentHistoryRequest{
		Name: name,
	}

	it := client.LookupEnvironmentHistory(ctx, req)
	for {
		env, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate environment history: %w", err)
		}
		fmt.Fprintf(w, "Environment: %s\n", env.GetName())
	}

	return nil
}

// [END dialogflow_v3_environments_lookup_environment_history]
