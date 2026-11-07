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

// [START clouderrorreporting_v1beta1_errorgroupservice_group_get]

import (
	"context"
	"fmt"
	"io"

	errorreporting "cloud.google.com/go/errorreporting/apiv1beta1"
	"cloud.google.com/go/errorreporting/apiv1beta1/errorreportingpb"
	"google.golang.org/api/option"
)

// getGroup retrieves an error group by project and group ID.
func getGroup(ctx context.Context, w io.Writer, projectID string, groupID string) error {
	groupName := fmt.Sprintf("projects/%s/groups/%s", projectID, groupID)

	client, err := errorreporting.NewErrorGroupClient(ctx, option.WithQuotaProject(projectID))
	if err != nil {
		return fmt.Errorf("NewErrorGroupClient: %w", err)
	}
	defer client.Close()

	req := &errorreportingpb.GetGroupRequest{
		GroupName: groupName,
	}

	group, err := client.GetGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("GetGroup: %w", err)
	}

	fmt.Fprintf(w, "Retrieved group: %s\n", group.GetName())

	return nil
}

// [END clouderrorreporting_v1beta1_errorgroupservice_group_get]
