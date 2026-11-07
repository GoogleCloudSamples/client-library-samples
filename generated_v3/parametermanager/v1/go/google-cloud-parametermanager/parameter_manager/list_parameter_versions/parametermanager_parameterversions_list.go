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

// [START parametermanager_v1_parametermanager_parameterversions_list]

import (
	"context"
	"fmt"
	"io"

	parametermanager "cloud.google.com/go/parametermanager/apiv1"
	parametermanagerpb "cloud.google.com/go/parametermanager/apiv1/parametermanagerpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listParameterVersions lists all parameter versions for a specific parameter.
func listParameterVersions(ctx context.Context, w io.Writer, projectID string, locationID string, parameterID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/parameters/%s", projectID, locationID, parameterID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-parametermanager.googleapis.com:443", locationID)))
	}

	client, err := parametermanager.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &parametermanagerpb.ListParameterVersionsRequest{
		Parent: parent,
	}

	it := client.ListParameterVersions(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate parameter versions: %w", err)
		}
		fmt.Fprintf(w, "Parameter version: %s\n", resp.GetName())
	}

	return nil
}

// [END parametermanager_v1_parametermanager_parameterversions_list]
